import { Component, OnInit } from '@angular/core';
import { EditTeacherModalComponent } from '../edit-teacher-modal/edit-teacher-modal.component';
import { TeacherService } from '../teacher-list/teacher.service';
import { ModalController } from '@ionic/angular';
import { EditStaffModalComponent } from '../edit-staff-modal/edit-staff-modal.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-code-generator-lists',
  templateUrl: './code-generator-lists.page.html',
  styleUrls: ['./code-generator-lists.page.scss'],
})
export class CodeGeneratorListsPage implements OnInit {

  codeGeneratorList : any;
  showLoading : boolean = false;
  deleteAllowed : boolean = false;
  constructor(private teacherService : TeacherService, 
    private modalController: ModalController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('role').then((val) => {
      if (val === 1 ) {
        this.deleteAllowed = true;
      } 
    });
    this.getAllCodeGeneratorList();
  }
  getAllCodeGeneratorList(){
    this.showLoading =true;
    this.teacherService.getAllCodeGenerator().subscribe((data) =>{
      this.codeGeneratorList = data;
      
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
      this.getAllCodeGeneratorList();
    });
    return await modal.present();
  }
  
  onClickDelete(staff){
    if(confirm(`Are you sure want to delete ${staff.first_name} ${staff.last_name} ?`)){
      this.showLoading =true;
    this.teacherService.deleteUserPermanent(staff._id).subscribe((data) =>{
      alert("Code Generator deleted successfully.")
      this.getAllCodeGeneratorList();
      this.showLoading =false;
    },err =>{
      this.showLoading =false;
    });
    }
  }

}
