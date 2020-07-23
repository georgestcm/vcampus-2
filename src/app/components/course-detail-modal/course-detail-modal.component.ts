import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CourseService } from 'r-teacher/add-course/course/course.service';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.scss']
})
export class CourseDetailModalComponent implements OnInit {

  courseData : any= {};
  fileURL : string ="";
  constructor(private modalController: ModalController, 
    private navParams: NavParams, private courseService:CourseService) {
    console.log(navParams.get('courseData'));
    this.courseData = navParams.get('courseData');
   }

  ngOnInit() {
   this.fileURL = environment.apiUrl+"/course/readFile";
   console.log(this.fileURL);
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}
}