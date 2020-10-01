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
    course: "",
    courseCodeValidFrom: "",
    courseCodeValidTo: "",
  };
  schoolList: [];
  courseList: [];
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Course---";
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

    this.getAllCourseCode();
  }

  dismiss() {
    this.courseCodeModal = {
      courseCode: "",
      school: "",
      course: "",
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

  getAllCourseCode() {
    this.courseService.getAllCourseCode().subscribe(
      (data) => {
        this.courseCodeList = data;
      },
      (err) => {}
    );
  }

  onSchoolChange(schoolId) {
    console.log(schoolId);
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

  onCourseChange(id) {
    this.courseCodeModal.courseCode = Math.random().toString(36).substr(2, 7);
  }
}
