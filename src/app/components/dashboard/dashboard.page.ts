import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  role : number;
  studentId : string;
  courseCode : string;
  message:string ='';
  courseCodeResponse : any;
  courseList : any;
  onlineClassLink : string;

  constructor(public translate: TranslateService,private storage: Storage, private courseService : CourseService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role=val;
  });

  this.storage.get('user').then((val) => {
    this.studentId= val._id;
    this.getAllEnrolledCourse();
  });

}

  onEnrollCourse(){
    const req = {
      studentId : this.studentId,
      courseCode : this.courseCode
    }
    this.courseService.enrollStudentForCourse(req).subscribe( res =>{
      console.log(res);
      this.message = res.msg + ", Course valid till "+ this.datepipe.transform(res.courseCode.courseCodeValidTo, 'yyyy-MM-dd');
      this.courseCodeResponse = res.courseCode;
      this.getAllEnrolledCourse();
    },err =>{
      console.log(err);
      this.message = err.error.msg;
    })
  }

  getAllEnrolledCourse(){

    this.courseService.getAllEnrolledCourse(this.studentId).subscribe( (res :any) =>{
      console.log(res);
      this.courseList = res[0];
    },err =>{
      console.log(err);
      this.message = err.error.msg;
    })
  }
  onJoinOnlineClass(){
    if(this.onlineClassLink !=""){
      const theTop=((screen.height/2)-(100/2))/2;
      const theLeft=(screen.width/2)-(500/2);
      const features = 'height=600,width=1000,top='+theTop+',left=200,titlebar=no,toolbar=0,Location=no,Directories=0,Status=0,menubar=0,Scrollbars=1,Resizable=1';
      window.open(this.onlineClassLink,'_blank', features);
    }
    
  }

}
