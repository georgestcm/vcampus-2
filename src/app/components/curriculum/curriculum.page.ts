import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { CourseService } from 'src/app/providers/common-service/course.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {

  constructor(private storage: Storage,
    private _course: CourseService,
    public translate: TranslateService, 
    private modalController : ModalController) { }
  error;
  myCurrentSchoolId;
  curList: any;
  curriculamModel = {
    school: '',
    curriculum: ''
  }
  courseList : any;
  
  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.myCurrentSchoolId = val._id;
      this.getCurr(val._id)

    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}
  getCurr(id) {
    this._course.getCurriculumList(id)
      .subscribe(
        res => {
          this.curList = res;
          console.log(res);
          //this.curList.push(res)
        },
        err => (
          console.log(err)
        )
      )
  }

  getCoursesByCurriculumId(curriculumId){
    this._course.getCourseByCurriculumId(curriculumId)
      .subscribe(
        res => {
          this.courseList = res;
          console.log(res);
         
        },
        err => (
          console.log(err)
        )
      )
  }

  saveCurriculam() {
    this.curriculamModel.school = this.myCurrentSchoolId
    if (this.curriculamModel.curriculum.length === 0) {
      this.error = "Please write a curriculum"
    } else {
      this.curriculamModel.curriculum.trim().charAt(0).toUpperCase()
      this._course.postCur(this.curriculamModel)
        .subscribe(
          res => (
            this.getCurr(this.myCurrentSchoolId),
            console.log(res)
          ),
          err => (
            this.error = err.error,
            console.log(this.error)
          )
        )
    }
  }
}

