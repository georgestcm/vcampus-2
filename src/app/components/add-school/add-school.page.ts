import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { environment } from 'src/environments/environment'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.page.html',
  styleUrls: ['./add-school.page.scss'],
})
export class AddSchoolPage implements OnInit {

  constructor(public _auth: AuthService,public translate: TranslateService,private modalController: ModalController) { }
  error;
  username;
  school;
  showNotification : boolean = false;
  message : string ="";
  buttonText : string ="ADD SCHOOL";
  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

  AddSchool(){
    this.school = {
      username: this.username.trim(),
      password:"12345",
      roles:3
    }
    if(this.username.length===0){
      this.error = "Please enter a username"
    } else {
      this.buttonText ="ADDING SCHOOL...";
      this._auth.createUser(this.school)
      .subscribe (
        res=> {
          console.log(res),
          this.showNotification = true;
          this.message = `School with the username of ${this.username} has been added`;
          //this.error = `School with the username of ${this.username} has been added`,
          this.username = '';
          this.buttonText="ADD SCHOOL";

        },
        err=> {
          this.showNotification = true;
          this.message = err.error
          this.buttonText="ADD SCHOOL";
        }
      )
    }

  }
}
