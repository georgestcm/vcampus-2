import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-r-teacher',
  templateUrl: './r-teacher.page.html',
  styleUrls: ['./r-teacher.page.scss'],
})
export class RTeacherPage implements OnInit {

  constructor(private router: Router,private storage: Storage) { }

  userName = {
    first_name:'',
    last_name:''
  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val);
    this.userName.first_name = val.first_name;
    this.userName.last_name = val.last_name;
  })
  }

  userData;

    toSchoolList(){
      this.router.navigate(['rteacher/school-list'])
    }

    toStudentList(){
      this.router.navigate(['rteacher/student-list'])
    }


    toCourseList(){
      this.router.navigate(['rteacher/courses-list'])
    }

    toExamList(){
      this.router.navigate(['rteacher/exam'])
    }
    toCollaboration(){
      this.router.navigate(['rteacher/collaboration'])
    }

    toGroupChat(){
      this.router.navigate(['rteacher/usersandgroup'])
    }

    toOnlineClass(){
      this.router.navigate(['rteacher/online-class'])
    }

    logoutUser(){
      this.storage.remove('token')
      this.storage.remove('user')
      this.storage.remove('role')
     this.router.navigate(['/login'])

    }

}
