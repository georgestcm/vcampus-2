import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ModalController } from "@ionic/angular";
import { AddExamModelPage } from "src/app/r-teacher-components/add-exam-model/add-exam-model.page";
import { ExamService } from "src/app/providers/common-service/exam.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.page.html",
  styleUrls: ["./exam-list.page.scss"],
})
export class ExamListPage implements OnInit {
  constructor(
    private router: Router,
    public modalController: ModalController,
    private storage: Storage,
    private _examService: ExamService
  ) {}
  addExamOrnot: boolean;
  allExams: [];

  ngOnInit() {
    this.storage.get("role").then((val) => {
      if (val === 5) {
        this.addExamOrnot = false;
      } else {
        this.addExamOrnot = true;
      }
    });
    this.getAllExams();
  }

  getAllExams() {
    this._examService.getAllExams().subscribe((res) => {
      debugger;
      this.allExams = res;
    });
  }

  async addExam() {
    const modal = await this.modalController.create({
      component: AddExamModelPage,
    });

    modal.onDidDismiss().then((data) => {
      this.getAllExams();
    });
    return await modal.present();
  }

  deleteExam(examId) {
    var data = { id: examId };
    if (confirm("Please confirm?")) {
      this._examService.deleteExam(data).subscribe((res) => {
        this.getAllExams();
      });
    }
  }

  viewExam(examId) {
    this.router.navigate([`/rteacher/exam/${examId}`]);
  }
}
