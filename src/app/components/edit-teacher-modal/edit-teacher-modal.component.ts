import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TeacherService } from '../teacher-list/teacher.service';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss'],
})
export class EditTeacherModalComponent implements OnInit {

  success : Boolean =false;
  teacherData : any;
  teacherModel ={
    first_name : "",
      last_name : "",
      phone_number : "",
      email : "",
      _id :""
  };
  showProgress : boolean =false;

  constructor(private modalController: ModalController, 
      private navParams: NavParams, private teacherService : TeacherService) { 
    this.teacherData = navParams.get('teacherData');
    console.log(this.teacherData);
    this.teacherModel ={
      first_name : this.teacherData.first_name,
      last_name : this.teacherData.last_name,
      phone_number : this.teacherData.phone_number,
      email : this.teacherData.email,
      _id: this.teacherData._id
    }
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

onClickSave(){
  console.log(this.teacherModel);
  if(this.teacherModel.first_name =="" || this.teacherModel.last_name =="" || this.teacherModel.email==null || this.teacherModel.phone_number==null){
    alert("All fields are required!");
    return;
  }
  this.showProgress = true;
  this.teacherService.updateTeacher(this.teacherModel).subscribe((data) =>{
    console.log(data);
    this.success =true;
    this.showProgress = false;
  },err =>{
    this.showProgress = false;
    this.success =false;
  })
}


}
