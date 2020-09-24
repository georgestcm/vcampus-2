import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-usersandgroup',
  templateUrl: './usersandgroup.page.html',
  styleUrls: ['./usersandgroup.page.scss'],
})
export class UsersAndgroupPage implements OnInit {

  selectedSegment :string ="";
  userList: Array<any> = []; 
  groupList: Array<any> = [];
  role:number;
  showSearch : boolean = false;
  studentList : Array<any> =[];
  constructor(private route: Router, private storage : Storage, private _auth : AuthService) { }

  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role = val;
      if(this.role <=2){
        this.selectedSegment ="group";
      }else{
        this.selectedSegment ="users";
      }

      this._auth.getListOfStudents().subscribe(res => {
        console.log(res);
        this.studentList = res;
      },err =>{
        console.log(err);
      });

    });
  }
  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }
  navigateToChat(user){
    //this.route.navigate(['admin/chat']);
    this.route.navigate(['rstudents/chat',{username : user.username, name :user.first_name +" "+user.last_name, _id : user._id}]);
  }
}
