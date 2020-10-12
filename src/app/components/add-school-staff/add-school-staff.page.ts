import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-school-staff',
  templateUrl: './add-school-staff.page.html',
  styleUrls: ['./add-school-staff.page.scss'],
})
export class AddSchoolStaffPage implements OnInit {

  constructor(private modalController : ModalController,public translate: TranslateService) { }
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
