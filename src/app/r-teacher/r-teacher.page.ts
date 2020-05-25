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

  ngOnInit() {
  }

  userData;
  toDashboard(){
     this.router.navigate(['rteacher/dashboard'])
   }


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
      this.router.navigate(['rteacher/exam-list'])
    }

    logoutUser(){
      this.storage.remove('token')
      this.storage.remove('user')
      this.storage.remove('role')
     this.router.navigate(['/login'])

    }

}
