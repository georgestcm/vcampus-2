import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";

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
  };
  schoolList: [];
  curriculumList: [];
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Curriculum---";
  courseCodeList: any;

  constructor(
    private modalController: ModalController,
    public _auth: AuthService,
    private courseService: CourseService
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
  }

  dismiss() {
    this.courseCodeModal = {
      courseCode: "",
      school: "",
      curriculum: "",
      courseCodeValidFrom: "",
      courseCodeValidTo: "",
    };
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onSubmit() {
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
