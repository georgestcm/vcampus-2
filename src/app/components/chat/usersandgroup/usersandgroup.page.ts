import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

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
  constructor(private route: Router, private storage : Storage) { }

  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role = val;
      if(this.role <=2){
        this.selectedSegment ="group";
      }else{
        this.selectedSegment ="users";
      }
    });
  }
  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }
  navigateToChat(){
    this.route.navigate(['admin/chat']);
  }
}
