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
  constructor(private courseService : CourseService, private storage: Storage, private modalController: ModalController) { }

  ngOnInit() {
    this.storage.get("user").then(res => {
      this.studentId = res._id;
      this.getAllPendingExams();
    });
  }

  getAllPendingExams(){
    this.courseService.getAllEnrolledCourse(this.studentId).subscribe( res =>{
     // console.log(res);
      for(let i=0; i< res[0].length; i++){
        this.courseService.getAllExamByCourseId(res[0][i]._id).subscribe(exam =>{
          this.examList.push(exam);
          console.log(this.examList);
        },error =>{
          console.log(error);
        })
      }
    },err =>{
      console.log(err);
    })
  }

  async showStartExamModal(exam) {
    const modal = await this.modalController.create({
      component: StudentExamStartModalComponent,
      componentProps : { exam : exam}
    });
    modal.onDidDismiss().then(data => {
      //this.getAllCourseCode();
    });
    return await modal.present();
  }

  }

