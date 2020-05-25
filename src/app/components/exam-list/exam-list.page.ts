import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.page.html",
  styleUrls: ["./exam-list.page.scss"],
})
export class ExamListPage implements OnInit {
  constructor(private storage: Storage) {}
  addExamOrnot: boolean;

  ngOnInit() {
    this.storage.get("role").then((val) => {
      if (val === 5) {
        this.addExamOrnot = false;
      } else {
        this.addExamOrnot = true;
      }
    });
  }
}
