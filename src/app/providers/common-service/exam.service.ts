import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientService } from "../http-client.service";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  private postNewExamUrl = "http://localhost:3000/api/post_exam";
  private getExamUrl = "http://localhost:3000/api/get_exam/";
  private deleteExamUrl = "http://localhost:3000/api/delete_exam/";

  constructor(
    private http: HttpClient,
    private _httpClient: HttpClientService
  ) {}

  postNewExam(data) {
    return this.http.post<any>(this.postNewExamUrl, data);
  }

  getExamDetail(data) {
    return this.http.get<any>(this.getExamUrl + data.id);
  }

  getAllExams() {
    return this.http.get<any>(this.getExamUrl);
  }

  deleteExam(data) {
    return this.http.delete<any>(this.deleteExamUrl + data.id);
  }

  // Questions
  private postNewQuesUrl = "http://localhost:3000/api/post_question";

  postNewQuestion(data) {
    return this.http.post<any>(this.postNewQuesUrl, data);
  }
  // Questions
}
