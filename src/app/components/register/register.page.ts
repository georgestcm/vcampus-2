import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StudentPageCourseListPage } from '../student-page-course-list/student-page-course-list.page';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public alertController: AlertController,
    public modalController: ModalController,
    public _auth: AuthService,
    public loadingController: LoadingController,
    private storage: Storage,
    private router: Router) { }

    schoolList : any;
  studentRegistration = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    new_password:"",
    password: "",
    roles: [6],
    school_id:""
  }

  password = {
    reEnter: ""
  }

  user;
  viewCoursesOrNot = true;
  selectedSchool = '';
  loading;
  selectedSchoolName ='';
  ngOnInit() {
    this._auth.getAllSchools().subscribe(res => {
      console.log(res);
      this.schoolList = res;
    },err =>{
      console.log(err);
    })
  }

  logData() {
    console.log(this.studentRegistration)
  }

  onSchoolChange(event:any){
    this.selectedSchoolName = event.target.options[event.target.options.selectedIndex].text;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: StudentPageCourseListPage
    });
    return await modal.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg
    });

    await alert.present();
  }

  /*register(){
 
    this.presentLoading()
    if(this.studentRegistration.first_name.length === 0){
      this.presentAlert("Enter your first name to continue")
      this.hideLoader()
    } else if(this.studentRegistration.last_name.length === 0){
      this.hideLoader()
      this.presentAlert("Enter your last name to continue")
    } else if(this.studentRegistration.username.length === 0){
      this.hideLoader()
      this.presentAlert("Enter a username to continue")
    } else if(this.studentRegistration.email.length === 0){
      this.hideLoader()
      this.presentAlert("Enter a email to continue")
    } else if(!this.studentRegistration.email.includes("@")){
      this.hideLoader()
      this.presentAlert("Enter a valid email to continue")
    } else if(this.studentRegistration.password.length < 5){
      this.hideLoader()
      this.presentAlert("Enter a password that has more then 5 characters to continue")
    } else if(this.password.reEnter.length < 5) {
      this.hideLoader()
       this.presentAlert("Re-enter your password.They do not match")
    } else if(Object.is(this.password.reEnter, this.studentRegistration.password)) {
         this._auth.registerStudent(this.studentRegistration)
         .subscribe (
           res=> (
             console.log(res),
            this.user = res.user,
           console.log(JSON.stringify(res.user)),
           this.storage.set('user',res.user),
           this.storage.set('token',res.token),
           this.storage.set('role',res.role),
           this.hideLoader(),
            this.router.navigate(['student/dashboard']),
             this.login_user_data.username = '',
             this.login_user_data.password = ''
           ),
           err=> (
             this.presentAlert(err.error),
             console.log(err),
             this.hideLoader()
           )
         )
         console.log(this.studentRegistration)
    } else {
      this.presentAlert("Re-enter your password.They do not match")
    }
 
  } */

  viewCourses(e) {
    console.log(e.detail.value)
    this.selectedSchool = e.detail.value;
    this.viewCoursesOrNot = false
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loging in',
    }).then((res) => {
      if (this.studentRegistration.first_name.length === 0) {
        this.loadingController.dismiss();
        this.presentAlert("Enter your first name to continue")
      } else if (this.studentRegistration.last_name.length === 0) {
        this.loadingController.dismiss();
        this.presentAlert("Enter your last name to continue")
      } else if (this.studentRegistration.username.length === 0) {
        this.loadingController.dismiss();
        this.presentAlert("Enter a username to continue")
      //} else if (this.studentRegistration.email.length === 0) {
        //this.loadingController.dismiss();
        //this.presentAlert("Enter a email to continue")
      } else if (this.studentRegistration.email.length >0 && !this.studentRegistration.email.includes("@")) {
        this.loadingController.dismiss();
        this.presentAlert("Enter a valid email to continue")
      } else if (this.studentRegistration.password.length < 5) {
        this.loadingController.dismiss();
        this.presentAlert("Enter a password that has more then 5 characters to continue")
      } else if (this.password.reEnter.length < 5) {
        this.loadingController.dismiss();
        this.presentAlert("Confirm your password.They do not match")
      } else if (Object.is(this.password.reEnter, this.studentRegistration.password)) {
        res.present();
        this._auth.registerStudent(this.studentRegistration)
          .subscribe(
            res => {
              //console.log(res)
              //this.user = res.user,
              //console.log(JSON.stringify(sres.user)),
              this.storage.set('user', res.registerUser)
              this.storage.set('token', res.token)  
              this.storage.set('role', res.registerUser.roles[0])
              this.loadingController.dismiss();
              this.joinStudentToSchool(res.registerUser._id);
              
              this.router.navigate(['rstudents/dashboard'])
              
            },
            err => (
              this.presentAlert(err.error),
              console.log(err),
              this.loadingController.dismiss()
            )
          )
        console.log(this.studentRegistration)
      } else {
        this.presentAlert("Password and confirm password doesn't match, please try again")
      }
    })

  }
  
  joinStudentToSchool(studentId){
    const requestBody ={
      GroupName : this.selectedSchoolName+"_Group",
      Description :'',
      SchoolId : this.studentRegistration.school_id,
      StudentId : studentId
      };

      this._auth.joinStudentToGroup(requestBody)
          .subscribe(
            res => {
              console.log(res);
            });
  }

}
