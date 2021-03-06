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
      return this._httpClient.authGet("/getAllTeacherForAdmin");
    }
    
    updateTeacher(request){
      return this._httpClient.authPut("/updateTeacher",request);
    }

    getAllAdminStaff(){
      return this._httpClient.authGet("/getAllAdminStaff");
    }

    updateStaff(request){
      return this._httpClient.authPut("/updateStaffDetail",request);
    }

    deleteUserPermanent(id){
      return this._httpClient.authDelete("/deleteUserPermanent/"+id);
    }
}
