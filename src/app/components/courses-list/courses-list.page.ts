import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.page.html",
  styleUrls: ["./courses-list.page.scss"],
})
export class CoursesListPage implements OnInit {
  constructor(
    private storage: Storage,
    private _course: CourseService,
    private router: Router
  ) {}

  addCourseOrnot;
  courses: [];
  ngOnInit() {
    this.storage.get("role").then((val) => {
      if (val === 5) {
        this.addCourseOrnot = false;
      } else {
        this.addCourseOrnot = true;
      }
    });

    this.getCourses();
  }

  getCourses() {
    this._course.getAll().subscribe((res) => {
      this.courses = res;
    });
  }

  viewCourse(courseId) {
    this.router.navigate([`/rteacher/course/${courseId}`]);
  }

  removeCourse(courseId) {
    alert("Course will be removed");
  }
}
