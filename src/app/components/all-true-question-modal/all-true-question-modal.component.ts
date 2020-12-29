import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-all-true-question-modal',
  templateUrl: './all-true-question-modal.component.html',
  styleUrls: ['./all-true-question-modal.component.scss'],
})
export class AllTrueQuestionModalComponent implements OnInit {

  questionModal = {
    school: "",
    exam: "",
    course: "",
    Question_title: "",
    Question_for :"",
    Question_options :[],
    Correct_answer :"",
    option :"",
    All_True : [],
    Type :"All-True"
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
        this.loadingSchool="Error Getting School";
      })
    }); 
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
      All_True : [],
      Type :"All-True"
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
  
  onAddOption(option){
    if(option.length>0){
    this.questionModal.Question_options.push({optionid : this.questionModal.Question_options.length+1, option :option});
    this.questionModal.option = "";
    }

  }

  get selectedAllTrue() {
    return this.questionModal.Question_options
              .filter(opt => opt.checked)
              .map(opt => opt.optionid)
  }

  onSubmit() {
    this.questionModal.All_True= this.selectedAllTrue;
    console.log(this.questionModal);
    this.courseService.saveMultiChoiceQuestion(this.questionModal).subscribe(
      (data) => {
        console.log(data);
        alert("New All-Tre question added!");
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
