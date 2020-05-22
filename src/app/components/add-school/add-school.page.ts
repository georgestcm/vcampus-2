import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.page.html',
  styleUrls: ['./add-school.page.scss'],
})
export class AddSchoolPage implements OnInit {

  constructor(public _auth: AuthService) { }
  error;
  username;
  school;
  ngOnInit() {
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
      this._auth.registerStudent(this.school)
      .subscribe (
        res=> (
          console.log(res),
          this.error = `School with the username of ${this.username} has been added`,
          this.username = ' '
        ),
        err=> (
          this.error = err.error
        )
      )
    }

  }
}
