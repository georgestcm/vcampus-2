import { Component, OnInit } from '@angular/core';
import { EditTeacherModalComponent } from '../edit-teacher-modal/edit-teacher-modal.component';
import { TeacherService } from '../teacher-list/teacher.service';
import { ModalController } from '@ionic/angular';
import { EditStaffModalComponent } from '../edit-staff-modal/edit-staff-modal.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {

  staffList : any;
  showLoading : boolean = false;
  constructor(private teacherService : TeacherService, private modalController: ModalController) { }

  ngOnInit() {
    this.getAllStaff();
  }
  getAllStaff(){
    this.showLoading =true;
    this.teacherService.getAllAdminStaff().subscribe((data) =>{
      this.staffList = data;
      console.log(data);
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
  }
  
  async onClickEdit(staff){
    const modal = await this.modalController.create({
      component: EditStaffModalComponent,
      componentProps : {"staffData":staff}
    });

    modal.onDidDismiss().then(data => {
      this.getAllStaff();
    });
    return await modal.present();
  }
  
  onClickDelete(staff){
    if(confirm(`Are you sure want to delete ${staff.first_name} ${staff.last_name} ?`)){
      this.showLoading =true;
    this.teacherService.deleteUserPermanent(staff._id).subscribe((data) =>{
      alert("Staff deleted successfully.")
      this.getAllStaff();
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
    }
  }

}
