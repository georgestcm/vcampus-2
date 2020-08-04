import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.page.html',
  styleUrls: ['./school-list.page.scss'],
})
export class SchoolListPage implements OnInit {

  constructor(private _auth : AuthService) { }
  schoolList : any;
  ngOnInit() {
    this._auth.getAllSchoolsForAdmin().subscribe(res => {
      console.log(res);
      this.schoolList = res;
    },err =>{
      console.log(err);
    })
  }

}
