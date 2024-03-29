import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-student-exam-start-modal',
  templateUrl: './student-exam-start-modal.component.html',
  styleUrls: ['./student-exam-start-modal.component.scss'],
})
export class StudentExamStartModalComponent implements OnInit {

  exam : any;
  startDateTime : Date;
  constructor(private modalController: ModalController,
    public _auth: AuthService,
    private courseService: CourseService,
    private storage : Storage,
    public navParams : NavParams) { 
      this.exam = navParams.get("exam");
      console.log(this.exam);
      this.startDateTime = new Date();
    }

    get selectedOptions() {
     let arr =[];
      for(let i=0; i<this.exam.questions.length; i++){
         for(let j=0; j<this.exam.questions[i].Question_options.length; j++){
          
          if(this.exam.questions[i].Type='All-True'){
            //  for(let k=0; k< this.exam.questions[i].All_True.length; k++){
            //   if(this.exam.questions[i].All_True[k] ==)
            // }
            // if(this.exam.questions[i].Correct_answer == this.exam.questions[i].Question_options[j].checked)
            // arr.push(this.exam.questions[i]);
          }else{
            if(this.exam.questions[i].Correct_answer == this.exam.questions[i].Question_options[j].checked)
            arr.push(this.exam.questions[i]);
          }
         }        
      }
      return arr;
    }
    
  ngOnInit() {}

  dismiss() {
    //this.resetFormField();
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  onSubmit() {
    //console.log(this.selectedOptions);
    let correctAnswer =0;
    for(let i=0;i<this.exam.questions.length; i++){

      if(this.exam.questions[i].Type == 'Fill-The-Blanks' && this.exam.questions[i].Fill_The_Blanks[0].answer == this.exam.questions[i].userAnswer){
        correctAnswer+=1;
      }
      if(this.exam.questions[i].Type == 'All-True' && this.exam.questions[i].All_True[0].answer == this.exam.questions[i].userAnswer){
        correctAnswer+=1;
      }
    }

    //console.log(this.exam);
      const req =   {
      Exam_Status : "Completed",
      TotalQuestion : this.exam.questions.length,
      CorrectAnswer : this.selectedOptions.length + correctAnswer,
      Exam_StartDateTime : this.startDateTime
    }

    
    
    this.courseService.updateExam(req,this.exam._id).subscribe(
      (data) => {
        console.log(data);
        alert("Exam submitted!");
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

