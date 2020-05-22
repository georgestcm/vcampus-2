import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-r-school-staff',
  templateUrl: './r-school-staff.page.html',
  styleUrls: ['./r-school-staff.page.scss'],
})
export class RSchoolStaffPage implements OnInit {

  constructor(private router: Router,private storage: Storage) { }

  ngOnInit() {
  }
  userData;
  toDashboard(){
     this.router.navigate(['rschoolstaff/dashboard'])
   }

   toPermissions(){
      this.router.navigate(['rschoolstaff/permissions'])
    }

    toSchoolList(){
      this.router.navigate(['rschoolstaff/school-list'])
    }

    toStudentList(){
      this.router.navigate(['rschoolstaff/student-list'])
    }

    toTeacherList(){
      this.router.navigate(['rschoolstaff/teacher-list'])
    }

    toCourseList(){
      this.router.navigate(['rschoolstaff/courses-list'])
    }

    logoutUser(){
      this.storage.remove('token')
      this.storage.remove('user')
      this.storage.remove('role')
     this.router.navigate(['/login'])

    }
}
