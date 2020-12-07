import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { QuestionModalComponent } from '../question-modal/question-modal.component';
import { TrueFalseQuestionModalComponent } from '../true-false-question-modal/true-false-question-modal.component';
import { FillTheBlanksQuestionModalComponent } from '../fill-the-blanks-question-modal/fill-the-blanks-question-modal.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  addCourseOrnot;
  questionList : Array<any>=[];
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


  async showAddQuestionModal() {
    const modal = await this.modalController.create({
      component: QuestionModalComponent
    });
    modal.onDidDismiss().then(data => {
      //this.getAllCourseCode();
    });
    return await modal.present();
  }

  async showTrueFalseQuestionModal() {
    const modal = await this.modalController.create({
      component: TrueFalseQuestionModalComponent
    });
    modal.onDidDismiss().then(data => {
      //this.getAllCourseCode();
    });
    return await modal.present();
  }

  async showFillTheBlanksQuestionModal() {
    const modal = await this.modalController.create({
      component: FillTheBlanksQuestionModalComponent
    });
    modal.onDidDismiss().then(data => {
      //this.getAllCourseCode();
    });
    return await modal.present();
  }

  onClickAddQuestion(){
    this.showAddQuestionModal();
  }

  onSchoolChange(schoolId){
    this.schoolId = schoolId;
  }

  onClickFind(){
    this.courseService.getAllMultiChoiceQuestionBySchoolId(this.schoolId).subscribe( res =>{
      console.log(res);
      this.questionList = res;
    },err =>{
      console.log(err);
    })
  }
}
