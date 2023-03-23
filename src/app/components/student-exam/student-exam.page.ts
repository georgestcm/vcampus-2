import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { StudentExamStartModalComponent } from '../student-exam-start-modal/student-exam-start-modal.component';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.page.html',
  styleUrls: ['./student-exam.page.scss'],
})
export class StudentExamPage implements OnInit {

  studentId : string;
  examList =[];
  courseList =[];
  showLoading : boolean=false;
  constructor(private courseService : CourseService, private storage: Storage, 
    private modalController: ModalController) { }

  ngOnInit() {
    this.storage.get("user").then(res => {
      this.studentId = res._id;
      this.getAllPendingExams();
    });
  }

  getAllPendingExams(){
    this.showLoading =true;
    this.courseService.getAllEnrolledCourse(this.studentId).subscribe( res =>{
      this.showLoading=false;
      this.courseList = res[0];
      //console.log(this.courseList);
      console.log('All enrolled course : ', this.courseList);
    //  if(res.length >0){
    //   for(let x=0; x < res.length; x++){
      
      // for(let i=0; i< res[x].length; i++){
      //   this.courseService.getAllExamByCourseId(res[x][i]._id).subscribe(exam =>{
      //    const exams = exam;
      //    console.log('examList ',exams);
      //    if(exam.length>0){
      //     this.examList.push(exam);
      //    }

      //     this.showLoading=false;
      //   },error =>{
      //     console.log(error);
      //     this.showLoading=false;
      //   })
      // }
    //}
    //}
    },err =>{
      console.log(err);
      this.showLoading=false;
    })
  }

  async showStartExamModal(exam) {
    const modal = await this.modalController.create({
      component: StudentExamStartModalComponent,
      componentProps : { exam : exam}
    });
    modal.onDidDismiss().then(data => {
      this.getAllPendingExams();
    });
    return await modal.present();
  }

  onCourseChange(id){
    this.examList=[];
    this.courseService.getAllExamByCourseId(id).subscribe(exam =>{
      const exams = exam;
      
      if(exam.length>0){
       this.examList.push(exam);
      }

       this.showLoading=false;
     },error =>{
       console.log(error);
       this.showLoading=false;
     });
  }

  OnClickFind(){

  }

  }

