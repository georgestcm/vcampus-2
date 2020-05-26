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
    exam_name: "",
    exam_description: "",
    exam_startDateTime: "",
    exam_endDateTime: "",
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
      ExamId: this.examId,
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
      Correct_answer: 0,
    });

    this.lastQuestionNo = questionNo + 1;
  }

  saveQuestion(questionNo) {
    debugger;
    let data = this.examDetail.questions[questionNo - 1];

    if (data == undefined) return;

    this._examService.postNewQuestion(data).subscribe((res) => {
      alert('Question saved successfully!');this.getExamDetail(this.examId);
    });
  }

  saveExam() {
    console.log(this.questionList);
    alert("Exam saved!");
  }
}
