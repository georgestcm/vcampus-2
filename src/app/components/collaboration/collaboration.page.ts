import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.page.html',
  styleUrls: ['./collaboration.page.scss'],
})
export class CollaborationPage implements OnInit {

  invitesList : any;
  fileURL : string ="";
  schoolId : string;
  teacherList : any;
  userRole : number=0;
  userId : string;

  constructor(
    private storage: Storage,
    public translate: TranslateService, 
    private courseService:CourseService) {}

  ngOnInit() {
          this.storage.get('user').then((user) => {
          this.userId = user._id;
          this.getInvites();   
        });
      }

getInvites(){
  this.courseService.getInvites(this.userId).subscribe((data) =>{
    this.invitesList = data;
    console.log(data);
  },err =>{
    console.log(err);
  })
}
acceptInvite(invite){
 const request ={
  id : invite._id,
    status : 'Accepted',
    courseId : invite.course._id,
    teacherId : invite.receipent
 };
 this.courseService.editInviteStatus(request).subscribe((res) =>{
  console.log(res);
  this.getInvites();
  alert("Invitation accepted!");
 },err =>{
   console.log(err);
 });
}
rejectInvite(invite){
  if(confirm("Are you sure to reject ? ")) {
  const request ={
    id : invite._id,
    status : 'Rejected',
    courseId : invite.course._id,
    teacherId : invite.receipent
 };
 this.courseService.editInviteStatus(request).subscribe((res) =>{
  console.log(res);
  this.getInvites();
  alert("Invitation rejected!");
 },err =>{
   console.log(err);
 })
}
}

deleteInvite(invite){
  if(confirm("Are you sure to delete ? ")) {
 this.courseService.deleteInvite(invite._id).subscribe((res) =>{
  console.log(res);
  this.getInvites();
  alert("Invitation deleted!");
 },err =>{
   console.log(err);
 })
}
}
}
