import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { ModalController } from '@ionic/angular';
import { EditTeacherModalComponent } from '../edit-teacher-modal/edit-teacher-modal.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.page.html',
  styleUrls: ['./teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {
  teacherList : any;
  showLoading : boolean = false;
  constructor(private teacherService : TeacherService, private modalController: ModalController) { }

  ngOnInit() {
    this.getAllTeachers();
  }
  getAllTeachers(){
    this.showLoading =true;
    this.teacherService.getAllTeacherForAdmin().subscribe((data) =>{
      this.teacherList = data;
      console.log(data);
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
      alert("Staff deleted successfully.")
      this.getAllTeachers();
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
    }
  }

}
