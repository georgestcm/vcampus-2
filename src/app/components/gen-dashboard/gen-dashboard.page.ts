import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-gen-dashboard',
  templateUrl: './gen-dashboard.page.html',
  styleUrls: ['./gen-dashboard.page.scss'],
})
export class GenDashboardPage implements OnInit {

  public userData: any;
  public currentGenerator: any;
  constructor(public translate: TranslateService,private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (val != undefined) {
        this.currentGenerator = val;
      }
    });
  }

  toDashboard() {
    this.router.navigate(['gen-dashboard'])
  }

  logoutUser() {
    this.storage.remove('token')
    this.storage.remove('user')
    this.storage.remove('role')
    this.router.navigate(['/login'])

  }

}
