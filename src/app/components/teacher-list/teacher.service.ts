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
}
