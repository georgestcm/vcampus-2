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
    environment.apiUrl+"api/create_new_teacher";


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
    return this._httpClient.authGet("api/get_all_teachers?username="+username);
  }

  addTeacherToSchool(schoolId, teacherId){
    return this._httpClient.authPut("api/add_teacher_to_school",
    {teacherId : teacherId, schoolId : schoolId });
  }

  addCourse(data) {
    return this._httpClient.authPost("api/course/save", data);
  }

  getSchoolsByTeacherId(teacherId){
    return this._httpClient.authGet("api/get_schools_by_teacherId?teacherId="+teacherId);
  }

  updateCourse(data, courseId) {
    return this._httpClient.authPut(`api/course/update/${courseId}`, data, );
  }

  getCourseBySchoolId(schoolId) {
    return this._httpClient.authGet(`api/course/getCoursesBySchoolId/${schoolId}`);
  }

  getMediaByUserId(userId) {
    return this._httpClient.authGet(`api/course/findMediaByUserId/${userId}`);
  }

  getSupportingDocs(fileName) {
    return this._httpClient.authGet(`api/course/readFile/${fileName}`, );
  }

  getCourseCourseName(searchText) {
    return this._httpClient.authGet(`api/course/findCoursesByCourseName/${searchText}`);
  }

  getAll() {
    return this._httpClient.authGet("api/course/getall");
  }

  getCourse(id) {
    return this._httpClient.authGet("api/course/get/" + id);
  }

  removeCourse(id){
    return this._httpClient.authDelete("api/course/delete/" + id);
  }
}
