import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { GenerateCourseCodeModalComponent } from '../generate-course-code-modal/generate-course-code-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService } from 'src/app/providers/common-service/download.service';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-generate-course-code',
  templateUrl: './generate-course-code.page.html',
  styleUrls: ['./generate-course-code.page.scss'],
})
export class GenerateCourseCodePage implements OnInit {

  courseCodeList : any;
  showLoading : boolean = false;
  loggedInUser : string='';
  userId: any;
  role: any;
  constructor(public translate: TranslateService,private modalController :  ModalController, 
    private courseService : CourseService, private downloadService : DownloadService,private storage: Storage) { }

  ngOnInit() {
   // this.getAllCourseCode();
   this.storage.get('user').then((user) => {
    this.userId=user._id;
   });
  
   this.storage.get('role').then((val) => {
    this.role = val;
  if(val===7){
    this.getAllCourseCodeByCreator();
  } else {
    this.getAllCourseCode();
  }
});
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
   this.courseCodeList = data.filter(x => x.school !=null);
   console.log(this.courseCodeList);
   this.showLoading=false;
    },err =>{
      console.log(err);
      this.showLoading=false;
    });
  }

  getAllCourseCodeByCreator(){
    this.showLoading=true;
    this.courseService.getAllCourseCodeByCreator(this.userId).subscribe(data =>{
   this.courseCodeList = data.filter(x => x.school !=null);
   console.log(this.courseCodeList);
   this.showLoading=false;
    },err =>{
      console.log(err);
      this.showLoading=false;
    });
  }

  download(){
    let jsonToExport =[];
    for(let i=0; i<this.courseCodeList.length; i++){
      jsonToExport.push({Curriculum : this.courseCodeList[i].curriculum.curriculum, CourseCode : this.courseCodeList[i].courseCode, ValidFrom : this.courseCodeList[i].courseCodeValidFrom, ValidTo : this.courseCodeList[i].courseCodeValidTo, GeneratedBy : this.courseCodeList[i].createdBy.username, GeneratedOn : this.courseCodeList[i].createdAt})
    }
    this.downloadService.downloadFile(jsonToExport, 'Course_Code');
  }

  async showSendMailModal(code){
    console.log('code', code)
    const modal = await this.modalController.create({
      component: EmailModalComponent,
      componentProps : {"code":code}
    });
    return await modal.present();
  }

}
