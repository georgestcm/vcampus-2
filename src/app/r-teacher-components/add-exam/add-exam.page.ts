import { Component, OnInit } from "@angular/core";
import { ExamService } from "src/app/providers/common-service/exam.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-exam",
  templateUrl: "./add-exam.page.html",
  styleUrls: ["./add-exam.page.scss"],
})
export class AddExamPage implements OnInit {
  examId = "";
  lastQuestionNo = 0;
  questionList = [];
  examDetail = {
    questions: [],
    Exam_Name: "",
    Exam_Description: "",
    Exam_StartDateTime: "",
    Exam_EndDateTime: "",
    Is_active: false,
    created_date: null,
    updated_date: null,
    deleted_date: null,
    is_deleted: false,
    _id: "",
  };

  constructor(
    private _examService: ExamService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.examId = params.get("id");
    });
    this.getExamDetail(this.examId);
  }

  getExamDetail(examId) {
    this._examService.getExamDetail({ id: examId }).subscribe((res) => {
      if (res.length > 0) {
        debugger;
        this.examDetail = res[0];
        if (this.examDetail !== undefined) {
          this.lastQuestionNo = this.examDetail.questions.length;
        }
      }
      this.addQuestion(this.lastQuestionNo);
    });
  }

  addQuestion(questionNo) {
    this.examDetail.questions.push({
      _id: "",
      examId: this.examId,
      question_no: questionNo + 1,
      question_title: "",
      question_options: [
        {
          optionid: 1,
          option: "",
        },
        {
          optionid: 2,
          option: "",
        },
        {
          optionid: 3,
          option: "",
        },
        {
          optionid: 4,
          option: "",
        },
      ],
      correct_answer: 0,
    });

    this.lastQuestionNo = questionNo + 1;
  }

  saveQuestion(questionNo) {
    let data = this.examDetail.questions[questionNo - 1];

    if (data == undefined) return;

    var objData = {
      ExamId: data.examId,
      Question_title: data.question_title,
      Question_options: data.question_options,
      Correct_answer: data.correct_answer,
    };

    console.clear();
    console.log(objData);

    this._examService.postNewQuestion(objData).subscribe((res) => {
      alert(res.message);
      this.getExamDetail(this.examId);
    });
  }

  removeQuestion(questionId) {
    if (questionId === "") return;
    var data = { id: questionId };
    this._examService.deleteQuestion(data).subscribe((res) => {
      alert(res.message);
      this.getExamDetail(this.examId);
    });
  }

  setCorrectAnswer(val, questionNo) {
    this.examDetail.questions[questionNo - 1].correct_answer = val;
  }

  saveExam() {
    console.log(this.questionList);
    alert("Exam saved!");
  }

  updateExamDetails() {
    var data = {
      Exam_Name: this.examDetail.Exam_Name,
      Exam_Description: this.examDetail.Exam_Description,
      Exam_StartDateTime: this.examDetail.Exam_StartDateTime,
      Exam_EndDateTime: this.examDetail.Exam_EndDateTime,
    };
    this._examService.putExam(data, this.examId).subscribe((res) => {
      alert("Exam details saved");
    });
  }
}
