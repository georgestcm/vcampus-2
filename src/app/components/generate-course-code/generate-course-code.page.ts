import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { GenerateCourseCodeModalComponent } from '../generate-course-code-modal/generate-course-code-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generate-course-code',
  templateUrl: './generate-course-code.page.html',
  styleUrls: ['./generate-course-code.page.scss'],
})
export class GenerateCourseCodePage implements OnInit {

  courseCodeList : any;
  showLoading : boolean = false;
  constructor(public translate: TranslateService,private modalController :  ModalController, private courseService : CourseService) { }

  ngOnInit() {
    this.getAllCourseCode();
  }

  async showCourseCodeGeneratorModal() {
    const modal = await this.modalController.create({
      component: GenerateCourseCodeModalComponent
    });
    modal.onDidDismiss().then(data => {
      this.getAllCourseCode();
    });
    return await modal.present();


  }

  getAllCourseCode(){
    this.showLoading=true;
    this.courseService.getAllCourseCode().subscribe(data =>{
   this.courseCodeList = data;
   console.log(data);
   this.showLoading=false;
    },err =>{
      console.log(err);
      this.showLoading=false;
    });
  }

}
