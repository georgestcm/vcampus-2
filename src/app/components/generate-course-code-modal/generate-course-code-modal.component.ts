import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-generate-course-code-modal",
  templateUrl: "./generate-course-code-modal.component.html",
  styleUrls: ["./generate-course-code-modal.component.scss"],
})
export class GenerateCourseCodeModalComponent implements OnInit {
  courseCodeModal = {
    courseCode: "",
    school: "",
    curriculum: "",
    courseCodeValidFrom: "",
    courseCodeValidTo: "",
    createdBy :""
  };
  schoolList: [];
  curriculumList: [];
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Curriculum---";
  courseCodeList: any;
  loggedInUser : string;

  constructor(
    private modalController: ModalController,
    public _auth: AuthService,
    private courseService: CourseService,
    private storage : Storage
  ) {}

  ngOnInit() {
    this._auth.getAllSchools().subscribe(
      (res) => {
        console.log(res);
        this.schoolList = res;
        this.loadingSchool = "---Select School---";
      },
      (err) => {
        console.log(err);
      }
    );


    //this.getAllCourseCode();

    this.storage.get('user').then((val) => {
      this.loggedInUser = val._id;
    }); 
  }

  dismiss() {
    this.courseCodeModal = {
      courseCode: "",
      school: "",
      curriculum: "",
      courseCodeValidFrom: "",
      courseCodeValidTo: "",
      createdBy: ""
    };
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onSubmit() {
    this.courseCodeModal.createdBy=this.loggedInUser;
    this.courseService.saveCourseCode(this.courseCodeModal).subscribe(
      (data) => {
        console.log(data);
        alert("New Course Code Added!");
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // getAllCourseCode() {
  //   this.courseService.getAllCourseCode().subscribe(
  //     (data) => {
  //       console.log("getAllCourseCode");
  //       this.courseCodeList = data;
  //       console.log(data);
  //     },
  //     (err) => {}
  //   );
  // }

  onSchoolChange(schoolId) {
    console.log(schoolId);
    this.loadingCourse = "Loading Curriculum...";
    this.courseService.getCurriculumList(schoolId).subscribe(
      (res) => {
        console.log(res);
        this.curriculumList = res;
        this.loadingCourse = "---Select Curriculum---";
      },
      (err) => {
        console.log(err);
        this.loadingCourse = "Loading Curriculum...";
      }
    );
  }

  onCurriculumChange(id) {
    this.courseCodeModal.courseCode = Math.random().toString(36).substr(2, 7);
  }
}
