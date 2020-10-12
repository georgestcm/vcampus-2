import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TeacherService } from '../teacher-list/teacher.service';
import { AuthService } from 'src/app/providers/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-school-modal',
  templateUrl: './edit-school-modal.component.html',
  styleUrls: ['./edit-school-modal.component.scss'],
})
export class EditSchoolModalComponent implements OnInit {

  success : Boolean =false;
  schoolData : any;
  schoolModel ={
    school_name : "",
    principal_first_name : "",
    principal_last_name : "",
    description : "",
      _id :""
  };
  showProgress : boolean =false;

  constructor(public translate: TranslateService,private modalController: ModalController, 
      private navParams: NavParams, public _auth: AuthService) {
    this.schoolData = navParams.get('schoolData');
    console.log(this.schoolData);
    this.schoolModel ={
      school_name : this.schoolData.school.school_name,
      principal_first_name : this.schoolData.school.principal_first_name,
      principal_last_name : this.schoolData.school.principal_last_name,
      description : this.schoolData.school.description,
      _id: this.schoolData._id
    }
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

onClickSave(){

  if(this.schoolModel.principal_first_name =="" || this.schoolModel.principal_last_name =="" || this.schoolModel.school_name==null || this.schoolModel.description==null){
    alert("All fields are required!");
    return;
  }
  this.showProgress = true;
  this._auth.updateSchoolData(this.schoolModel).subscribe((data) =>{
    console.log(data);
    this.success =true;
    this.showProgress = false;
  },err =>{
    this.showProgress = false;
    this.success =false;
  })
}

}
