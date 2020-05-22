import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private getCurList = "https://vcampus.herokuapp.com/api/get_curriculum_list"
  private postCurList = "https://vcampus.herokuapp.com/api/post_curriculum_list"
  private postNewTeacher = "https://vcampus.herokuapp.com/api/create_new_teacher"

  constructor(private http: HttpClient, private _httpClient: HttpClientService, ) { }


  getCurriculumList(id) {
    return this.http.get<any>(this.getCurList, {
      params: {
        _id: id
      }
    })
  }

  postCur(data) {
    return this.http.post<any>(this.postCurList, data)
  }

  createNewTeacher(data, id) {
    return this.http.post<any>(this.postNewTeacher, data, {
      params: {
        school_id: id
      }
    })
  }
}
