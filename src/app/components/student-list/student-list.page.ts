import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  constructor(private _auth : AuthService, private storage : Storage) { }
  studentList : any;
  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val._id);
   if(val._id !=null){
    this._auth.getAllStudents(val._id).subscribe(res => {
      console.log(res);
      this.studentList = res;
    },err =>{
      console.log(err);
    });
  }
  });
  }

}
