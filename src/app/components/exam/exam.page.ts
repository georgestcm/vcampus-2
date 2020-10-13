import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  addCourseOrnot;
  examList : Array<any>=[];
  showLoading : boolean = false;
  schoolList : any;
  role : number;
  schoolId : string;

  constructor(private storage: Storage, 
    private modalController: ModalController, private router: Router, private courseService : CourseService) { }
  

  ngOnInit() {
    this.storage.get('role').then((val) => {
      
    if(val===5){
      this.addCourseOrnot = false;
    } else {
      this.addCourseOrnot = true;
    }
  
 if(this.role == 5){
  this.storage.get('user').then((val) => {
    this.courseService.getSchoolsByTeacherId(val._id).subscribe(res =>{
      this.schoolList = res;
    }, err => {
      console.log(err);
    })
  }); 
}
// } else {
//   this._auth.getAllSchools().subscribe(res => {
//     console.log(res);
//     this.schoolList = res;
//   },err =>{
//     console.log(err);
//   })
// }
});
  
  }

  onSchoolChange(schoolId){

  }

  onClickFind(){
    
  }
}
