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
  error='';
  txtUserName ="";
  re_password = '';
  teacher_data = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    roles: 5
  }
  showLoading : boolean=false;
  myCurrentId;
  teacherData : any;
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
        this.showLoading=true;
        this._course.createNewTeacher(this.teacher_data, this.myCurrentId)
          .subscribe(
            res => (
              console.log(res),
              this.error = res.msg,
              this.teacher_data.username = ' ',
              this.teacher_data.first_name = ' ',
              this.teacher_data.last_name = ' ',
              this.teacher_data.password = '',
              this.re_password = '',
              this.showLoading =false
            ),
            err => {
              this.error = err.error.msg
              this.showLoading=false;
            }
          )
      }
    }
  }

  onClickSearch(){
    if(this.txtUserName.length ==0){
      this.error="Username is required!";
      return;
    }
    this.error="";
    this.showLoading = true;
    this._course.getAllTeacher(this.txtUserName).subscribe(res => 
      { 
        this.showLoading = false;
        if(res.length ==0){
          this.error = `No teacher found, for user ${this.txtUserName} !`;
        }
        console.log(res);
        this.teacher_data.username = res[0].username;
        this.teacher_data.first_name = res[0].first_name;
        this.teacher_data.last_name = res[0].last_name;
        this.teacher_data.id = res[0]._id;
      }, err=>{ 
        this.error ="Something went wrong, while getting teacher!";
        console.log(err);
        this.showLoading = false;
      });
  }
  onClickAdd(){
    if(this.myCurrentId.length == 0 && this.teacher_data.id.length ==0){
      this.error = "Username is required.";
      return;
    }
    this.showLoading =true;
    this._course.addTeacherToSchool(this.myCurrentId,this.teacher_data.id).subscribe(res => {
      this.error = res.msg;
      this.teacher_data.username = '';
      this.teacher_data.first_name = '';
      this.teacher_data.last_name = '';
      this.teacher_data.password = '';
      this.re_password = '';
      this.txtUserName ="";
      this.teacher_data.id="";
      this.showLoading =false;
    },err =>{
      console.log(err);
      this.showLoading =false;
      this.error = err.error.msg;
    });
  }

}
