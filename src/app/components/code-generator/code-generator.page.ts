import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.page.html',
  styleUrls: ['./code-generator.page.scss'],
})
export class CodeGeneratorPage implements OnInit {

  constructor(public _auth: AuthService, private modalController: ModalController) { }

  ngOnInit() {
  }
  password;
  username = '';
  first_name = '';
  last_name = '';
  user_staff_info;
  error;

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

  loginfo() {

    this.password = this.last_name + "generator";
    this.user_staff_info = {
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      roles: 7
    }

    if (this.username.toString().length === 0) {
      this.error = "Please enter a username"
    } else if (this.first_name.length === 0) {
      this.error = "Please enter a first name"
    } else if (this.last_name.length === 0) {
      this.error = "Please enter a last name"
    } else {
      this._auth.registerStudent(this.user_staff_info)
        .subscribe(
          res => (
            this.user_staff_info.first_name = ' ',
            this.user_staff_info.last_name = ' ',
            this.user_staff_info.username = ' ',
            this.first_name = ' ',
            this.last_name = ' ',
            this.username = ' ',
            this.error = "New code generator added"
          ),
          err => (
            console.log(err),
            this.error = err.error
          )
        )
    }

  }

}
