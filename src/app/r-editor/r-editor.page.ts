import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-r-editor',
  templateUrl: './r-editor.page.html',
  styleUrls: ['./r-editor.page.scss'],
})
export class REditorPage implements OnInit {

  constructor(private router: Router,private storage: Storage) { }
  userName = {
    first_name:'',
    last_name:''
  }
  ngOnInit() {
    this.storage.get('user').then((val) => {
    this.userName.first_name = val.first_name;
    this.userName.last_name = val.last_name;
  })
}

  userData;

    logoutUser(){
      this.storage.remove('token')
      this.storage.remove('user')
      this.storage.remove('role')
     this.router.navigate(['/login'])

    }
}
