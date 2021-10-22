import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-course-share-teacher-model',
  templateUrl: './course-share-teacher-model.component.html',
  styleUrls: ['./course-share-teacher-model.component.scss'],
})
export class CourseShareTeacherModelComponent implements OnInit {

  courseData : any= {};
  fileURL : string ="";
  schoolId : string;
  teacherList : any;
  userRole : number=0;
  userId : string;

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private storage: Storage,
    public translate: TranslateService, 
    private courseService:CourseService) {
    
    this.courseData = navParams.get('courseData');
   }

  ngOnInit() {

    this.storage.get('role').then((role) => {
      this.userRole = role;
      if(this.userRole ==5){
        this.storage.get('user').then((user) => {
          this.schoolId = user.teacherInSchool.schools[0]._id;
          this.userId = user._id;
          console.log(this.schoolId);
          this.getTeacherList();
        });
      }
    });

  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

getTeacherList(){
  //this.showLoading = true;
  this.courseService.getTeachersBySchoolId(this.schoolId).subscribe( (data) => {
   this.teacherList = data.school.teacher;
   console.log(this.teacherList);
   //this.showLoading = false;
  },
  err => {
    console.log(err);
    //this.showLoading = false;
 })

}

sendInvite(id){
  const reuest = {
    receipentId : id,
    courseId : this.courseData._id,
    senderId : this.userId
  }
  this.courseService.saveInvite(reuest).subscribe((data) =>{
    alert("Invite sent successfully");
  },err =>{
    console.log(err);
  })
}

}
