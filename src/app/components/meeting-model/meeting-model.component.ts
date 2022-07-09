import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-meeting-model',
  templateUrl: './meeting-model.component.html',
  styleUrls: ['./meeting-model.component.scss'],
})
export class MeetingModelComponent implements OnInit {

  meetingModel = {
    school: "",
    course: "",
    meetingName: "",
    meetingDescription: ""
  };
  schoolList: [];
  courseList: [];
  questionList : any;
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Course---";
  meetingList: any;
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
    // this.meetingModel = {
    //   school: "",
    //   course: "",
    //   meetingName: "",
    //   meetingDescription: ""
    // };
    this.meetingModel.meetingName="";
    this.meetingModel.meetingDescription="";
  }

  dismiss() {
    this.resetFormField();
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onSchoolChange(schoolId) {
    
    this.meetingModel.school = schoolId;
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

  onCourseChange(courseId) {
    this.meetingModel.course = courseId;
    this.getMeetingByCourse();
  }

  onStartMeeting(id){
    const json ={ id : id}
     this.modalController.dismiss(json);
  }

  



  getMeetingByCourse() {
     
    this.courseService.getMeetingByCourse(this.meetingModel.course).subscribe(
      (data) => {
        console.log(data);
        
        this.meetingList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    
    console.log(this.meetingModel);
    this.courseService.saveMeeting(this.meetingModel).subscribe(
      (data) => {
        console.log(data);
        alert("New Meeting Created!");
        //this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
