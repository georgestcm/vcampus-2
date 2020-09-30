import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.page.html',
  styleUrls: ['./code-generator.page.scss'],
})
export class CodeGeneratorPage implements OnInit {

  password;
  username = '';
  first_name = '';
  last_name = '';
  user_info;
  error;

  constructor(public _auth: AuthService, private modalController: ModalController) { }

  ngOnInit() {
  }
  

 

 

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

loginfo() {

  this.password = this.last_name + "12345";
  this.user_info = {
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
    this._auth.registerStudent(this.user_info)
      .subscribe(
        res => (
          this.user_info.first_name = ' ',
          this.user_info.last_name = ' ',
          this.user_info.username = ' ',
          this.first_name = ' ',
          this.last_name = ' ',
          this.username = ' ',
          this.error = "A new code generator has been added"
        ),
        err => (
          console.log(err),
          this.error = err.error
        )
      )
  }

}
}
