import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { LanguageSelectPage } from 'src/app/components/language-select/language-select.page';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SchoolRegisterPage } from 'src/app/components/school-register/school-register.page';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,
    public translate: TranslateService,
    public popoverController: PopoverController,
    private storage: Storage,
    private _auth: AuthService,
    private menuController: MenuController,
    public modalController: ModalController) { }

  franceFlag = '/assets/icon/fr.png'
  englishFlag = '/assets/icon/en.png'
  flag;
  currentLang;
  roleRequestNumber;
  role;
  currentUserRoute;
  userRole =0;
  login_user_data = {
    username: '',
    password: '',
    role_request: null
  }
  spinner : boolean =false;
  error_message = {
    error: '',
    error_red_msg: true,
    btn_text: false,
    spinner: true,
    login_btn: false
  }

  logged_in_or_not = false;

  user = {
    first_name: '',
    last_name: ''
  };
  loaderToShow;
  routeDirect;
  ngOnInit() {

    this.storage.get("role").then(res => {
      this.userRole = res !=null ? res :0;
    });

    Promise.all([this.storage.get('language'), this.storage.get('user'), this.storage.get('token')]).then(values => {
      values[0] === 'en' ? this.flag = '/assets/icon/en.png' : this.flag = '/assets/icon/fr.png'
      values[2] ? this.logged_in_or_not = true : this.logged_in_or_not = false;
      values[1] ? this.user = values[1] : this.user;
      // if (values[1].roles[0] === 1) {
      //   this.currentUserRoute = "admin"
      // } else if (values[1].roles[0] === 2) {
      //   this.currentUserRoute = "editor"
      // } else if (values[1].roles[0] === 3) {
      //   this.currentUserRoute = "rschool"
      // } else if (values[1].roles[0] === 4) {
      //   this.currentUserRoute = "rschoolstaff"
      // } else if (values[1].roles[0] === 5) {
      //   this.currentUserRoute = "rteacher"
      // } else if (values[1].roles[0] === 6) {
      //   this.currentUserRoute = "rstudents"
      // }
    })
  }



  async presentPopover() {
    const popover = await this.popoverController.create({
      component: LanguageSelectPage,
      translucent: false
    });
    return await popover.present();
  }

  getRoleRequest(e) {
    this.role = e.detail.value
    if (Object.is(e.detail.value, "Admin")) {
      this.login_user_data.role_request = 1
      this.routeDirect = "admin"
    } else if (Object.is(e.detail.value, "Editor")) {
      this.login_user_data.role_request = 2
      this.routeDirect = "editor"
    } else if (Object.is(e.detail.value, "School")) {
      this.login_user_data.role_request = 3
      this.routeDirect = "rschool"
    } else if (Object.is(e.detail.value, "School staff")) {
      this.login_user_data.role_request = 4
      this.routeDirect = "rschoolstaff"
    } else if (Object.is(e.detail.value, "Teacher")) {
      this.login_user_data.role_request = 5
      this.routeDirect = "rteacher"
    } else if (Object.is(e.detail.value, "Student")) {
      this.login_user_data.role_request = 6
      this.routeDirect = "rstudents"
    }
    else if (Object.is(e.detail.value, "Generator")) {
      this.login_user_data.role_request = 7
      this.routeDirect = "gen-dashboard"
    }
  }

  login() {
    this.error_message.error = "";
    this.error_message.error_red_msg = true;
    this.error_message.btn_text = true;
    this.error_message.spinner = false;
    this.error_message.login_btn = true;
    if (this.login_user_data.username.length === 0) {
      this.error_message.error = "Enter a username";
      this.error_message.error_red_msg = false;
      this.error_message.btn_text = false;
      this.error_message.spinner = true;
      this.error_message.login_btn = false;
    } else if (this.login_user_data.password.length === 0) {
      this.error_message.error = "Enter a password";
      this.error_message.error_red_msg = false;
      this.error_message.btn_text = false;
      this.error_message.spinner = true;
      this.error_message.login_btn = false;
    } else if (this.login_user_data.role_request === null) {
      this.error_message.error = "Please select a role";
      this.error_message.error_red_msg = false;
      this.error_message.btn_text = false;
      this.error_message.spinner = true;
      this.error_message.login_btn = false;
    } else {
      this.login_user_data.username.trim()
      this.login_user_data.password.trim()
      this.spinner=true;
      this._auth.loginUser(this.login_user_data)
        .subscribe(
          res => (
            this.spinner=false,
            this.user = res.user,
            this.storage.set('user', res.user),
            this.storage.set('token', res.token),
            this.storage.set('role', res.role),
            //this.router.navigate([`${this.routeDirect}`]),
            this.continueToAccount(res.role),
            this.login_user_data.username = '',
            this.login_user_data.password = ''
          ),
          err => (
            this.spinner=false,
            this.error_message.error = err.error,
            this.error_message.error_red_msg = false,
            this.error_message.btn_text = false,
            this.error_message.spinner = true,
            this.error_message.login_btn = false
          )
        )
    }
  }

  signOut() {
    this.storage.remove('token')
    this.storage.remove('user')
    this.storage.remove('role')
    this.logged_in_or_not = false;
  }

  continueToAccount(role=0) {
    if(this.userRole == 0){
      this.userRole = role;
    }
    switch(this.userRole){
      case 7:
        this.router.navigate(['gen-dashboard/generate-course-code']);
        break;
      case 6:
      this.router.navigate(['rstudents/student-course']);
      break;
      case 5:
      this.router.navigate(['rteacher/courses-list']);
      break;
      case 4:
      this.router.navigate(['rschoolstaff/student-list']);
      break;
      case 3:
      this.router.navigate(['rschool/student-list']);
      break;
      case 2:
      this.router.navigate(['editor/school-list']);
      break;
      case 1:
      this.router.navigate(['admin/school-list']);
      break;
      default:
        this.router.navigate(['error']);
        break;
    }
  }

  toAbout() {
    this.router.navigate(['/about'])
  }

  toContact() {
    this.router.navigate(['/contact'])
  }


  async registerSchool() {
    const modal = await this.modalController.create({
      component: SchoolRegisterPage
    });
    return await modal.present();
  }

}
