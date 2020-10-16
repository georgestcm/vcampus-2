import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-create-exam-modal',
  templateUrl: './create-exam-modal.component.html',
  styleUrls: ['./create-exam-modal.component.scss'],
})
export class CreateExamModalComponent implements OnInit {

  examModal = {
    school: "",
    Exam_Name: "",
    course: "",
    Exam_Description: "",
    Exam_Type :"",
    questions :[],
    Exam_StartDateTime :"",
    Exam_EndDateTime :"",
  };
  schoolList: [];
  courseList: [];
  questionList : any;
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
    this.examModal = {
      school: "",
      Exam_Name: "",
      course: "",
      Exam_Description: "",
      Exam_Type :"",
      questions :[],
      Exam_StartDateTime :"",
      Exam_EndDateTime :"",
    };
  }

  dismiss() {
    this.resetFormField();
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onSchoolChange(schoolId) {
    
    this.examModal.school = schoolId;
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


  onExamTypeChange(type){
    if(type.length>0){
    this.courseService.getAllMultiChoiceQuestionByCourseAndType(this.examModal.course, type).subscribe(res => {
      console.log(res);
      this.questionList = res;
    }, err =>{
      console.log(err);
    })
    }

  }

  get selectedQuestions() {
    return this.questionList
              .filter(opt => opt.checked)
              .map(opt => opt._id)
  }

  onSubmit() {
    this.examModal.questions = this.selectedQuestions;
    console.log(this.examModal);
    this.courseService.saveExam(this.examModal).subscribe(
      (data) => {
        console.log(data);
        alert("New Exam Created!");
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
