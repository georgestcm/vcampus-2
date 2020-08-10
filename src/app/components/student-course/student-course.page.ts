import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.page.html',
  styleUrls: ['./student-course.page.scss'],
})
export class StudentCoursePage implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }
  onClickStartLearning(){
    this.route.navigate(['rstudents/student-course-view']);
  }
}
