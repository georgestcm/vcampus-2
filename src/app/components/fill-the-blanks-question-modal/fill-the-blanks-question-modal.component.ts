import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-fill-the-blanks-question-modal',
  templateUrl: './fill-the-blanks-question-modal.component.html',
  styleUrls: ['./fill-the-blanks-question-modal.component.scss'],
})
export class FillTheBlanksQuestionModalComponent implements OnInit {

  questionModal = {
    school: "",
    exam: "",
    course: "",
    Question_title: "",
    Question_for :"",
    Question_options :[],
    Correct_answer :"",
    option :"",
    Fill_The_Blanks : [],
    Type :"Fill-The-Blanks"
  };
  schoolList: [];
  courseList: [];
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Course---";
  courseCodeList: any;
  userId = "";
  dashedList = [];
  dashedCounter : number =0;
  answer =[];

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
      option :"",
      Fill_The_Blanks : [],
      Type :"Fill-The-Blanks"
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
      },
      (err) => {
        console.log(err);
        this.loadingCourse = "Loading Course...";
      }
    );
  }
  
  addDashToQuestion(){
    this.dashedCounter+=1;
    this.questionModal.Question_title +="____";
    this.dashedList.push({id : this.dashedCounter, answer :""});
  }

  onSubmit() {
    this.questionModal.Fill_The_Blanks=this.dashedList;
    console.log(this.questionModal);
    this.courseService.saveMultiChoiceQuestion(this.questionModal).subscribe(
      (data) => {
        console.log(data);
        alert("New fill the blank question added!");
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
