import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {

  constructor() { }
  sectionNumber = 1;
  chapterNumber =1;
  topicNumber= 1;
  ngOnInit() {
  }

}
