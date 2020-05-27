import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientService } from "../http-client.service";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  private postNewExamUrl = "http://localhost:3000/api/post_exam";
  private putExamUrl = "http://localhost:3000/api/update_exam/";
  private getExamUrl = "http://localhost:3000/api/get_exam/";
  private deleteExamUrl = "http://localhost:3000/api/delete_exam/";

  constructor(
    private http: HttpClient,
    private _httpClient: HttpClientService
  ) {}

  postNewExam(data) {
    return this.http.post<any>(this.postNewExamUrl, data);
  }

  putExam(data, examId) {
    return this.http.put<any>(this.putExamUrl + examId, data, {
      params: { examId: examId },
    });
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
  private deleteQuesUrl = "http://localhost:3000/api/delete_question/";

  postNewQuestion(data) {
    return this.http.post<any>(this.postNewQuesUrl, data);
  }

  deleteQuestion(data) {
    return this.http.delete<any>(this.deleteQuesUrl + data.id);
  }
  // Questions
}
