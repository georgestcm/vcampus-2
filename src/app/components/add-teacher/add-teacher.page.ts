import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.page.html',
  styleUrls: ['./add-teacher.page.scss'],
})
export class AddTeacherPage implements OnInit {

  constructor(private storage: Storage,
    private _course: CourseService) { }
  error;
  re_password = '';
  teacher_data = {
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    roles: 5
  }
  myCurrentId;
  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.myCurrentId = val._id;
    })
  }

  addTeacher() {
    if (this.teacher_data.username.length === 0) {
      this.error = "Please enter a username"
    } else if (this.teacher_data.first_name.length === 0) {
      this.error = "Please enter a first name"
    } else if (this.teacher_data.last_name.length === 0) {
      this.error = "Please enter a last name"
    } else if (this.teacher_data.password.length === 0) {
      this.error = "Please enter a password"
    } else if (this.re_password.length === 0) {
      this.error = "Please re-enter a password"
    } else {
      if (this.teacher_data.password !== this.re_password) {
        this.error = "Your password do not match"
      } else {
        this.teacher_data.username.trim()
        this.teacher_data.first_name.trim()
        this.teacher_data.last_name.trim()
        this.teacher_data.password.trim()
        this.re_password.trim()
        this.error = ''
        this._course.createNewTeacher(this.teacher_data, this.myCurrentId)
          .subscribe(
            res => (
              console.log(res),
              this.error = res.msg,
              this.teacher_data.username = ' ',
              this.teacher_data.first_name = ' ',
              this.teacher_data.last_name = ' ',
              this.teacher_data.password = '',
              this.re_password = ''
            ),
            err => (
              this.error = err.error.msg
            )
          )
      }
    }
  }

}
