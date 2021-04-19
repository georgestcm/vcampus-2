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
    return this._httpClient.authGet("api/get_curriculam_by_school/"+id);
  }

  postCur(data) {
    return this._httpClient.authPost("api/save_curriculam", data);
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

  getCourseByCourseName(course) {
    return this._httpClient.authGet(`api/get_all_enrolled_course_by_course/${course}`);
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

  saveCourseCode(data) {
    return this._httpClient.authPost("api/generate_course_code", data);
  }

  getAllCourseCode() {
    return this._httpClient.authGet("api/get_all_course_code");
  }

  enrollStudentForCourse(data) {
    return this._httpClient.authPut("api/student_course_enrollment", data);
  }

  getAllEnrolledCourse(studentId) {
    return this._httpClient.authGet("api/get_all_enrolled_course/"+studentId);
  }

  saveMultiChoiceQuestion(data) {
    return this._httpClient.authPost("api/post_question", data);
  }

  getAllMultiChoiceQuestionBySchoolId(schoolId) {
    return this._httpClient.authGet("api/get_questions_by_school/"+ schoolId);
  }

  getAllMultiChoiceQuestionByCourseAndType(courseId,type) {
    return this._httpClient.authGet(`api/get_questions_by_course_and_type/${courseId}/${type}`);
  }

  saveExam(data) {
    return this._httpClient.authPost("api/post_exam", data);
  }

  getAllExamBySchoolId(schoolId) {
    return this._httpClient.authGet("api/get_exam_by_school/"+ schoolId);
  }

  updateExam(data,id) {
    return this._httpClient.authPut("api/update_exam/"+id, data);
  }

  getAllExamByCourseId(courseId) {
    return this._httpClient.authGet("api/get_exam_by_course/"+ courseId);
  }

  deleteQuestion(questionId) {
    return this._httpClient.authDelete("api/delete_question/"+ questionId);
  }

  getCourseByCurriculumId(curriculumId) {
    return this._httpClient.authGet(`api/course/getCoursesByCurriculum/${curriculumId}`);
  }
}
