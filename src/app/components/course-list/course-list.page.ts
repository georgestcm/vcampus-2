import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { ModalController } from '@ionic/angular';
import { CourseDetailModalComponent } from '../course-detail-modal/course-detail-modal.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  constructor(public translate: TranslateService,private storage: Storage, private courseService : CourseService,
    private modalController: ModalController, private router: Router, private _auth : AuthService) { }
  addCourseOrnot;
  courseList : Array<any>=[];
  showLoading : boolean = false;
  schoolList : any;
  role : number;
  schoolId : string;

  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role=val;
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
} else {
  this._auth.getAllSchools().subscribe(res => {
    console.log(res);
    this.schoolList = res;
  },err =>{
    console.log(err);
  })
}
});
  //  this.courseService.getAll().subscribe( (data) => {
  //    console.log(data);
  //   this.courseList = data;
  //   this.showLoading = false;
  //  },
  //  err => {
  //    console.log(err);
  //    this.showLoading = false;
  // })
  }

  onSchoolChange(val){
    if(val !=""){
      this.schoolId = val;
    }
  }
  onClickFind(){
    if(this.schoolId == undefined){
      alert("Please choose school to continue.");
      return;
    }
    this.showLoading = true;
     
    this.courseService.getCourseBySchoolId(this.schoolId).subscribe( (data) => {
     this.courseList = data;
     this.showLoading = false;
    },
    err => {
      console.log(err);
      this.showLoading = false;
   })
  
  }

  onEditClick(course){
    this.router.navigate(['/add-course']);
    //this.router.navigateByUrl('/add-course');
  }
  async showModal(data) {
    const modal = await this.modalController.create({
      component: CourseDetailModalComponent,
      componentProps : {"courseData":data}
    });
    return await modal.present();
  }
  deleteCourse(id){
    if(confirm("Are you sure to delete ? ")) {
      this.courseService.removeCourse(id).subscribe(res => {
       const query = this.courseList.find( a=> a._id == id);
       const index = this.courseList.indexOf(query);
       this.courseList.splice(index,1);
       alert("Course removed.");
      },
       err =>{ console.log(err);
        alert("Something went wrong while deleting.")}
        );
    }

  }

}
