import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { ModalController } from '@ionic/angular';
import { EditTeacherModalComponent } from '../edit-teacher-modal/edit-teacher-modal.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.page.html',
  styleUrls: ['./teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {
  teacherList = [];
  showLoading : boolean = false;
  schoolId : string;
  role : any;
  schoolName : string='Teacher List';
  constructor(private teacherService : TeacherService, 
    private modalController: ModalController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.schoolId = val._id;
      this.storage.get("role").then((data) => {
        this.role = data;
        if(this.role == 3){
          this.schoolName = val.school.school_name + " - Teacher List";
          this.getAllTeachersByRole();
        }else{
          this.getAllTeachers();
        }
      });
      
      
    });
    
     
    
  }
  getAllTeachersByRole(){
    this.showLoading =true;
    this.teacherList =[];
    this.teacherService.getTeachersBySchoolId(this.schoolId).subscribe((data) =>{
      //this.teacherList = data;
      console.log("schoolid",this.schoolId);
      //console.log(data.school.teacher[0]._id);
      for(let i=0; i<data.school.teacher.length; i++){
        if(data.school.teacher[i]._id != null)
        {
          const users = data.school.teacher[i]._id;
          this.teacherList.push(users);
        }
        
      }
      console.log(this.teacherList);
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
  }

  getAllTeachers(){
    this.showLoading =true;
    this.teacherList =[];
    this.teacherService.getAllTeacherForAdmin().subscribe((data) =>{
      this.teacherList = data;
      console.log("teacherList",this.teacherList);
      //console.log(data.school.teacher[0]._id);
      // for(let i=0; i<data.school.teacher.length; i++){
      //   if(data.school.teacher[i]._id != null)
      //   {
      //     const users = data.school.teacher[i]._id;
      //     this.teacherList.push(users);
      //   }
        
      // }
      // console.log(this.teacherList);
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
  }
  
  async onClickEdit(teacher){
    const modal = await this.modalController.create({
      component: EditTeacherModalComponent,
      componentProps : {"teacherData":teacher}
    });

    modal.onDidDismiss().then(data => {
      this.getAllTeachers();
    });
    return await modal.present();
  }
  
  onClickDelete(teacher){
    if(confirm(`Are you sure want to delete ${teacher.first_name} ${teacher.last_name} ?`)){
      this.showLoading =true;
    this.teacherService.deleteUserPermanent(teacher._id).subscribe((data) =>{
      alert("Deleted successfully.")
      this.getAllTeachers();
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
    }
  }

}
