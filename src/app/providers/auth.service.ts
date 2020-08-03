import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { HttpClientService } from './http-client.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loginTesting = "https://vcampus.herokuapp.com/api/login"
  // private registerStudentUrl = "https://vcampus.herokuapp.com/api/register"
  // private _getRegisterSchool = "https://vcampus.herokuapp.com/api/register_school_login"
  // private _saveSchoolData = "https://vcampus.herokuapp.com/api/save_school_data"

  constructor(private http: HttpClient, private _httpClient: HttpClientService,
    private _router: Router, private storage: Storage) { }


  getToken() {
    return this.storage.get('token')
  }

  loginUser(user) {
    return this._httpClient.post('/login', user);
  }

  registerStudent(studentData) {
    return this._httpClient.post('/register', studentData);
  }
  createUser(userData) {
    return this._httpClient.post('/register', userData);
  }
  getAllSchools(){
    return this._httpClient.get('/get_all_schools');
  }
  loggedIn() {
    return this.storage.get('token').then((token) => {
      if (token) {
        return true
      } else {
        return false
      }
    })
  }

  getRegisterSchool(schoolData) {
    return this._httpClient.post('/register_school_login', schoolData);
  }

  saveSchoolData(schoolData) {
    return this._httpClient.post('/save_school_data', schoolData);
  }
}
