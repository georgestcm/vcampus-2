import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ExamService } from "src/app/providers/common-service/exam.service";

@Component({
  selector: "app-add-exam-model",
  templateUrl: "./add-exam-model.page.html",
  styleUrls: ["./add-exam-model.page.scss"],
})
export class AddExamModelPage implements OnInit {
  exam = {
    Exam_Name: "",
    Exam_Description: "",
    Exam_StartDateTime: "",
    Exam_EndDateTime: "",
    Created_Date: "",
    Updated_Date: "",
  };
  error: string;
  success: string;
  myCurrentId;

  constructor(private storage: Storage, private _examService: ExamService) {}

  ngOnInit() {
    this.storage.get("user").then((val) => {
      this.myCurrentId = val._id;
    });
  }

  addExam() {
    this.success = "";
    if (this.exam.Exam_Name.length === 0) {
      this.error = "Please enter exam name";
    } else if (this.exam.Exam_Description.length === 0) {
      this.error = "Please enter exam description";
    } else if (this.exam.Exam_StartDateTime.length === 0) {
      this.error = "Please enter exam start date";
    } else if (this.exam.Exam_EndDateTime.length === 0) {
      this.error = "Please enter exam end date";
    } else {
      this.exam.Exam_Name.trim();
      this.exam.Exam_Description.trim();
      this.exam.Exam_StartDateTime.trim();
      this.exam.Exam_EndDateTime.trim();
      this.exam.Created_Date = new Date().toUTCString();
      this.exam.Updated_Date = new Date().toUTCString();
      this.error = "";
      this._examService.postNewExam(this.exam).subscribe(
        (res) => {
          (this.error = res.msg), this.initalizeExam();
          this.success = "Exam saved successfully!";

          setTimeout(() => {
            this.success = "";
          }, 5000);
        },
        (err) => (this.error = err.error.msg)
      );
    }
  }

  initalizeExam() {
    this.exam = {
      Exam_Name: "",
      Exam_Description: "",
      Exam_StartDateTime: "",
      Exam_EndDateTime: "",
      Created_Date: "",
      Updated_Date: "",
    };
  }
}
