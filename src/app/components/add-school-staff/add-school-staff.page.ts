import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-add-school-staff',
  templateUrl: './add-school-staff.page.html',
  styleUrls: ['./add-school-staff.page.scss'],
})
export class AddSchoolStaffPage implements OnInit {

  constructor(private modalController : ModalController,
    public translate: TranslateService, public _auth: AuthService) { }
 error;
 showNotification : boolean = false;
  message : string ="";

 schoolStaffModel : any={
  username : '',
  password : '',
  first_name :'',
  last_name : '',
  roles: 4
  };
 username;
  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

onSubmit(){

if(this.schoolStaffModel.username.length===0){
      this.error = "Please enter a username";
      return
    }
    else if(this.schoolStaffModel.first_name.length===0){
      this.error = "Please enter First Name";
      return
    }
    else if(this.schoolStaffModel.last_name.length===0){
      this.error = "Please enter a Last Name";
      return
    }
    else{
      this.schoolStaffModel.password =this.schoolStaffModel.last_name+"12345";
      this._auth.createUser(this.schoolStaffModel)
      .subscribe (
        res=> {
          console.log(res),
          this.showNotification = true;
          this.message = `School Staff with the username of ${this.schoolStaffModel.username} has been added`;
          
          this.username = '';
          //this.buttonText="ADD SCHOOL";

        },
        err=> {
          this.showNotification = true;
          this.message = err.error
          
        }
      )
    }
}
}
