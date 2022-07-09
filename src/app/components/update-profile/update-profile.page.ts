import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  userDetail : any = {};
  showNotification : boolean =false;
  message : string='';
  role :any;
  constructor(private storage : Storage, public _auth: AuthService) {
    
    this.userDetail ={
      _id :"",
      username : "",
      first_name :"",
      last_name :"",
      phone_number :"",
      password :"",
      new_password :"",
      confirm_password : "",
      action: "",
      email:""
    };


   }

  ngOnInit() {
    this.storage.get('user').then((profile) => {
      this.userDetail._id = profile._id;
      this.userDetail.username = profile.username;
      this.userDetail.email = profile.email;
      this.userDetail.first_name = profile.first_name;
      this.userDetail.last_name = profile.last_name;

      this.storage.get("role").then((data) => {
        this.role = data;
        if(this.role == 3){
          this.userDetail.first_name = profile.school.principal_first_name;
          this.userDetail.last_name = profile.school.principal_last_name;
        }
      });
    });
  } 

  saveUserDataAndPassword(){
    this._auth.updateProfile(this.userDetail)
      .subscribe (
        res=> {
          console.log(res),
          this.showNotification = true;
          this.message = res.msg + ". You need to re-login to see the changes!";

        },
        err=> {
          console.log(err);
          this.showNotification = true;
          this.message = err.error
          
        }
      )
  }

  onUpdateProfile(){
   
    if(this.role == 3){
      this.userDetail.action='Update School Profile';
    }else{
      this.userDetail.action='Update Profile';
    }
   
    this.saveUserDataAndPassword();
  }

  onChangePassword(){
    if(this.userDetail.new_password != this.userDetail.confirm_password){
      alert("New password & confirm password doesn't match!");
      return;
    }
    this.userDetail.action='Change Password';
    this.saveUserDataAndPassword();
  }

}
