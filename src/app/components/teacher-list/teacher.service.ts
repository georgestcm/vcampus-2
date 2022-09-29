import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientService } from "src/app/providers/http-client.service";
import { environment} from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient,
    private _httpClient: HttpClientService) { }

    getAllTeacherForAdmin(){
      return this._httpClient.authGet("api/getAllTeacherForAdmin");
    }
    
    updateTeacher(request){
      return this._httpClient.authPut("api/updateTeacher",request);
    }

    getAllAdminStaff(){
      return this._httpClient.authGet("api/getAllAdminStaff");
    }

    getAllCodeGenerator(){
      return this._httpClient.authGet("api/getAllCodeGenerator");
    }

    updateStaff(request){
      return this._httpClient.authPut("api/updateStaffDetail",request);
    }

    deleteUserPermanent(id){
      return this._httpClient.authDelete("api/deleteUserPermanent/"+id);
    }

    getTeachersBySchoolId(schoolId) {
      return this._httpClient.authGet(`api/getAllTeachersBySchool/${schoolId}`);
    }
}
