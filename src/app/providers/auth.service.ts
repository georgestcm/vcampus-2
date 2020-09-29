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
    return this._httpClient.post('api/login', user);
  }

  registerStudent(studentData) {
    return this._httpClient.post('api/register', studentData);
  }
  createUser(userData) {
    return this._httpClient.post('api/register', userData);
  }
  getAllSchools(){
    return this._httpClient.get('api/get_all_schools');
  }

  getAllSchoolsForAdmin(){
    return this._httpClient.get('api/get_all_schools_for_admin');
  }

  getAllStudents(schoolId){
    return this._httpClient.get('api/get_all_students/'+schoolId);
  }

  getListOfStudents(){
    return this._httpClient.get('/student_list');
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
    return this._httpClient.post('api/register_school_login', schoolData);
  }

  saveSchoolData(schoolData) {
    return this._httpClient.post('api/save_school_data', schoolData);
  }

  updateSchoolData(schoolData) {
    return this._httpClient.authPut('api/updateSchoolDetail', schoolData);
  }
}
