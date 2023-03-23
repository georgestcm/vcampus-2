import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { QuestionModalComponent } from '../question-modal/question-modal.component';
import { CreateExamModalComponent } from '../create-exam-modal/create-exam-modal.component';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.page.html',
  styleUrls: ['./create-exam.page.scss'],
})
export class CreateExamPage implements OnInit {

  addCourseOrnot;
  examList : Array<any>=[];
  showLoading : boolean = false;
  schoolList : any;
  role : number;
  schoolId : string;

  constructor(private storage: Storage,
    private modalController: ModalController, private router: Router, private courseService : CourseService) { }


  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role = val;
    if(val===5){
      this.addCourseOrnot = false;
    } else {
      this.addCourseOrnot = true;
    }

 if(this.role == 5){
  this.storage.get('user').then((val) => {
    this.courseService.getSchoolsByTeacherId(val._id).subscribe(res =>{
      this.schoolList = res;
    }, err => {
      console.log(err);
    })
  });
}

});

  }

 getAllExamBySchool(){
  this.courseService.getAllExamBySchoolId(this.schoolId).subscribe( res =>{
    console.log(res);
    this.examList = res;
  },err =>{
    console.log(err);
  })
 }
  async showCreateExamModal() {
    const modal = await this.modalController.create({
      component: CreateExamModalComponent
    });
    modal.onDidDismiss().then(data => {
      this.getAllExamBySchool();
    });
    return await modal.present();


  }



  onSchoolChange(schoolId){
    this.schoolId = schoolId;
  }

  onClickFind(){
    this.getAllExamBySchool();
  //   this.courseService.getAllExamBySchoolId(this.schoolId).subscribe( res =>{
  //     console.log(res);
  //     this.questionList = res;
  //   },err =>{
  //     console.log(err);
  //   })
   }

   onDeleteExam(q){
    console.log(q);
    this.courseService.deleteExam(q._id).subscribe( res =>{
      
      alert('Exam deleted successfully!');
      this.getAllExamBySchool();
    },err =>{
      console.log(err);
    })
  }


}
