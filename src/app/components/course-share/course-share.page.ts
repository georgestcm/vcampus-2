import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CourseShareTeacherModelComponent } from '../course-share-teacher-model/course-share-teacher-model.component';

@Component({
  selector: 'app-course-share',
  templateUrl: './course-share.page.html',
  styleUrls: ['./course-share.page.scss'],
})
export class CourseSharePage implements OnInit {

  constructor(
    public translate: TranslateService,
    private storage: Storage, 
    private courseService : CourseService,
    private modalController: ModalController
    ) { }
  addCourseOrnot;
  courseList : Array<any>=[];
  showLoading : boolean = false;
  schoolList : any;
  role : number;
  schoolId : string;

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.schoolId = val._id;
      this.onClickFind();
    });
  
  }

  onSchoolChange(val){
    if(val !=""){
      this.schoolId = val;
    }
  }

  onClickFind(){
    this.showLoading = true;
    this.courseService.getCourseBySchoolId(this.schoolId).subscribe( (data) => {
     this.courseList = data;
     this.showLoading = false;
    },
    err => {
      console.log(err);
      this.showLoading = false;
   })
  
  }

  async showCourseShareTeacherModal(data){
    const modal = await this.modalController.create({
      component: CourseShareTeacherModelComponent,
      componentProps : {"courseData":data}
    });
    return await modal.present();
  }


  

}
