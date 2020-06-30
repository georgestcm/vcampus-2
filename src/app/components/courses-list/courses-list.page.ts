import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { ModalController } from '@ionic/angular';
import { CourseDetailModalComponent } from '../course-detail-modal/course-detail-modal.component';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.page.html',
  styleUrls: ['./courses-list.page.scss'],
})
export class CoursesListPage implements OnInit {

  constructor(private storage: Storage, private courseService : CourseService, 
    private modalController: ModalController) { }
  addCourseOrnot;
  courseList : any;
  showLoading : boolean = true;
  ngOnInit() {
    this.storage.get('role').then((val) => {
    if(val===5){
      this.addCourseOrnot = false;
    } else {
      this.addCourseOrnot = true;
    }
  });
   this.courseService.getAll().subscribe( (data) => {
     console.log(data);
    this.courseList = data;
    this.showLoading = false;
   },
   err => { 
     console.log(err);
     this.showLoading = false;
  })
  }

  async showModal(data) {
    const modal = await this.modalController.create({
      component: CourseDetailModalComponent,
      componentProps : {"courseData":data}
    });
    return await modal.present();
  }

}
