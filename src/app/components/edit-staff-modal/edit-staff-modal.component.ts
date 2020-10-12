import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TeacherService } from '../teacher-list/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-staff-modal',
  templateUrl: './edit-staff-modal.component.html',
  styleUrls: ['./edit-staff-modal.component.scss'],
})
export class EditStaffModalComponent implements OnInit {

  success : Boolean =false;
  staffData : any;
  staffModel ={
    first_name : "",
      last_name : "",
      phone_number : "",
      email : "",
      _id :""
  };
  showProgress : boolean =false;

  constructor(public translate: TranslateService,private modalController: ModalController, 
      private navParams: NavParams, private teacherService : TeacherService) {
    this.staffData = navParams.get('staffData');
    console.log(this.staffData);
    this.staffModel ={
      first_name : this.staffData.first_name,
      last_name : this.staffData.last_name,
      phone_number : this.staffData.phone_number,
      email : this.staffData.email,
      _id: this.staffData._id
    }
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

onClickSave(){
  console.log(this.staffModel);
  if(this.staffModel.first_name =="" || this.staffModel.last_name =="" || this.staffModel.email==null || this.staffModel.phone_number==null){
    alert("All fields are required!");
    return;
  }
  this.showProgress = true;
  this.teacherService.updateStaff(this.staffModel).subscribe((data) =>{
    console.log(data);
    this.success =true;
    this.showProgress = false;
  },err =>{
    this.showProgress = false;
    this.success =false;
  })
}

}
