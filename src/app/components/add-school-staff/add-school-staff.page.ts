import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-school-staff',
  templateUrl: './add-school-staff.page.html',
  styleUrls: ['./add-school-staff.page.scss'],
})
export class AddSchoolStaffPage implements OnInit {

  constructor(private modalController : ModalController) { }
 error;
 username;
  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}
}
