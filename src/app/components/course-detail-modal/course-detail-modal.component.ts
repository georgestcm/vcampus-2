import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.scss']
})
export class CourseDetailModalComponent implements OnInit {

  courseData : any= {};
  imageURL : string ="";
  constructor(private modalController: ModalController, private navParams: NavParams) {
    console.log(navParams.get('courseData'));
    this.courseData = navParams.get('courseData');
   }

  ngOnInit() {
   this.imageURL = environment.imageUrl;
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}
}