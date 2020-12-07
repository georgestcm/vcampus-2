import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-true-false-question-modal',
  templateUrl: './true-false-question-modal.component.html',
  styleUrls: ['./true-false-question-modal.component.scss'],
})
export class TrueFalseQuestionModalComponent implements OnInit {

    questionModal = {
      school: "",
      exam: "",
      course: "",
      Question_title: "",
      Question_for :"",
      Question_options :[],
      Correct_answer :"",
      option :"",
    };
    schoolList: [];
    courseList: [];
    loadingSchool = "Loading School...";
    loadingCourse = "--Select Course---";
    courseCodeList: any;
    userId = "";

    constructor(
      private modalController: ModalController,
      public _auth: AuthService,
      private courseService: CourseService,
      private storage : Storage
    ) {}

    ngOnInit() {
    
      this.storage.get('user').then((val) => {
        this.userId = val._id;
        this.loadingSchool="---Select School---";
        this.courseService.getSchoolsByTeacherId(this.userId).subscribe(res =>{  
          this.schoolList = res;
          console.log(res);
          this.loadingSchool="---Select School---";
        }, err => {
          console.log(err);
          this.loadingSchool="Error Getting Schol";
        })
      }); 

      //this.getAllCourseCode();
    }

    resetFormField(){
      this.questionModal = {
        school: "",
        exam: "",
        course: "",
        Question_title: "",
        Question_for :"",
        Question_options :[],
        Correct_answer :"",
        option :""
      };
    }

    dismiss() {
      this.resetFormField();
      this.modalController.dismiss({
        dismissed: true,
      });
    }

    onSchoolChange(schoolId) {
      
      this.questionModal.school = schoolId;
      this.loadingCourse = "Loading Course...";
      this.courseService.getCourseBySchoolId(schoolId).subscribe(
        (res) => {
          console.log(res);
          this.courseList = res;
          this.loadingCourse = "---Select Course---";
          this.generateTrueFalseOption();
        },
        (err) => {
          console.log(err);
          this.loadingCourse = "Loading Course...";
        }
      );
    }


    onAddOption(option){
      if(option.length>0){
      this.questionModal.Question_options.push({optionid : this.questionModal.Question_options.length+1, option :option});
      this.questionModal.option = "";
      }
    }

    generateTrueFalseOption(){
      this.questionModal.Question_options.push({optionid : 1, option :"True"});
      this.questionModal.Question_options.push({optionid : 2, option :"False"});
    }

    onSubmit() {
      console.log(this.questionModal);
      this.courseService.saveMultiChoiceQuestion(this.questionModal).subscribe(
        (data) => {
          console.log(data);
          alert("New Question Added!");
          this.dismiss();
        },
        (err) => {
          console.log(err);
        }
      );
    }
}
