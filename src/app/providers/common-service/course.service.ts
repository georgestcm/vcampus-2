import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientService } from "../http-client.service";
import { environment} from "../../../environments/environment"
@Injectable({
  providedIn: "root",
})
export class CourseService {
  private getCurList = "https://vcampus.herokuapp.com/api/get_curriculum_list";
  private postCurList =
    "https://vcampus.herokuapp.com/api/post_curriculum_list";
  private postNewTeacher =
    environment.apiUrl+"/create_new_teacher";


  constructor(
    private http: HttpClient,
    private _httpClient: HttpClientService
  ) {}

  getCurriculumList(id) {
    return this.http.get<any>(this.getCurList, {
      params: {
        _id: id,
      },
    });
  }

  postCur(data) {
    return this.http.post<any>(this.postCurList, data);
  }

  createNewTeacher(data, id) {
    return this.http.post<any>(this.postNewTeacher, data, {
      params: {
        school_id: id,
      },
    });
  }

  getAllTeacher(username){
    return this._httpClient.authGet("/get_all_teachers?username="+username);
  }

  addTeacherToSchool(schoolId, teacherId){
    return this._httpClient.authPut("/add_teacher_to_school", 
    {teacherId : teacherId, schoolId : schoolId });
  }

  addCourse(data) {
    console.log(data);
    return this._httpClient.authPost("/course/save", data);
  }

  getSchoolsByTeacherId(teacherId){
    return this._httpClient.authGet("/get_schools_by_teacherId?teacherId="+teacherId);
  }

  updateCourse(data, courseId) {
    return this._httpClient.authPut(`/course/update/${courseId}`, data, );
  }

  getAll() {
    return this._httpClient.authGet("/course/getall");
  }

  getCourse(id) {
    return this._httpClient.authGet("/course/get/" + id);
  }

  removeCourse(id){
    return this._httpClient.authDelete("/course/delete/" + id);
  }
}
