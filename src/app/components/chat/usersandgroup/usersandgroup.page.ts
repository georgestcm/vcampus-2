import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersandgroup',
  templateUrl: './usersandgroup.page.html',
  styleUrls: ['./usersandgroup.page.scss'],
})
export class UsersAndgroupPage implements OnInit {

  selectedSegment :string ="users";
  userList: Array<any> = []; 
  groupList: Array<any> = [];
  constructor(private route: Router) { }

  ngOnInit() {
    
  }
  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
    console.log('Segment changed', ev);
    console.log(ev.detail.value);
  }
  navigateToChat(){
    this.route.navigate(['admin/chat']);
  }
}
