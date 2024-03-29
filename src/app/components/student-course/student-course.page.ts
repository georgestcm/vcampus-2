import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.page.html',
  styleUrls: ['./student-course.page.scss'],
})
export class StudentCoursePage implements OnInit {

  courseList  :any;
  showLoading : boolean = false;
  userRole : number;
  searchText : string ="";
  studentId : string;
  curriculumList : any;
  constructor(private router : Router, private courseService : CourseService, private storage: Storage,) { }

  ngOnInit() {
    this.storage.get("role").then(res => {
      this.userRole = res !=null ? res :0;
    });

    this.storage.get("user").then(res => {
      this.studentId = res._id;
      this.getAllEnrolledCourse();
      this.getAllEnrolledCurriculum();
    });

    //this.loadAllCourse();
  }
  onClickStartLearning(id){
    switch(this.userRole){
      case 6:
      this.router.navigate(['rstudents/student-course-view',{'id': id}]);
      break;
      case 5:
      this.router.navigate(['rteacher/student-course-view',{'id': id}]);
      break;
      case 4:
      this.router.navigate(['rschoolstaff/student-course-view',{'id': id}]);
      break;
      case 3:
      this.router.navigate(['rschool/student-course-view',{'id': id}]);
      break;
      case 2:
      this.router.navigate(['editor/student-course-view',{'id': id}]);
      break;
      case 1:
      this.router.navigate(['admin/student-course-view',{'id': id}]);
      break;
      default:
        this.router.navigate(['error']);
        break;
    }
    //this.router.navigate(['rstudents/student-course-view',{'id': id}]);
  }
  loadAllCourse(){
    this.getAllEnrolledCourse();
    // this.showLoading =true;
    // this.courseService.getAll().subscribe( (data) => {
    //   this.courseList = data;
    //   this.showLoading =false;
    //   //console.log(data);
    //   //this.showLoading = false;
    //  },
    //  err => {
    //    console.log(err);
    //    this.showLoading =false;
    //    //this.showLoading = false;
    // })
  }
  onClickFind(){
    this.showLoading = true;
    this.courseService.getCourseByCourseName(this.searchText).subscribe((data) =>{
      this.courseList = data[0];
      
      this.showLoading =false;
      
    },err =>{
      console.log(err);
       this.showLoading =false;
    });
  }

  getAllEnrolledCourse(){
   
    this.courseService.getAllEnrolledCourse(this.studentId).subscribe( res =>{
      console.log(res);
      this.courseList = res[0];
      this.showLoading =false;
    },err =>{
      console.log(err);
    })
  }

  getAllEnrolledCurriculum(){
   
    this.courseService.getAllEnrolledCurriculum(this.studentId).subscribe( res =>{
      this.curriculumList =res.result;
      this.showLoading =false;
      console.log(this.curriculumList);
    },err =>{
      console.log(err);
    })
  }
  
}
