import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.page.html',
  styleUrls: ['./teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {
  teacherList : any;
  constructor(private teacherService : TeacherService) { }

  ngOnInit() {
    this.getAllTeachers();
  }
  getAllTeachers(){
    this.teacherService.getAllTeacherForAdmin().subscribe((data) =>{
      this.teacherList = data;
      console.log(data);
    },err =>{

    });
  }

}
