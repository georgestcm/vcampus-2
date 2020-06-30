import { Component, OnInit, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AddCourseModel } from "./add-course.model";
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.page.html",
  styleUrls: ["./add-course.page.scss"],
})
export class AddCoursePage implements OnInit {
  courseModel: any = {};
  sectionList: Array<any> = [];
  chapterList: Array<any> = [];
  topicList: Array<any> = [];
  paragraphList: Array<any> = [];
  docList: Array<any> = [];

  sectionJSON: Array<any> = [];
  sectionQuery: any;
  chapterQuery : any;
  topicQuery : any;
  paragraphQuery : any;
  selectedSection : string;
  selectedChapter : string;
  selectedTopic : string;
  selectedParagraph : string;
  validationError : any= { formValid :true, validationField:'', errorMessage:''};
  successNotification : any = { visible : false, successMessage :''};
  userId : "";
  showLoading = false;
  showSuccess = false;
  statusMessage = "";

  constructor(private courseService: CourseService, private storage : Storage) {}

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.userId = val._id;
    });
    this.courseModel = {
      courseName: "",
      subject: "",
      description: "",
      availableFrom: "",
      availableTo: "",
      repeatYearly: false,
      section: "",
      chapter: "",
      topic: "",
      paragraph: "",
      supportingDocs: "",
      sectionDropdown:"",
      chapterDropdown : "",
      topicDropdown : "",
      paragraphDropdown : "",
      sections: {},
      userId :"",
      school : "",
      curriculum :"",
    };
    console.log(localStorage.getItem('access_token'));
  }
  
  onAddSection(sec) {
    if (sec === "") {
      this.validationError.formField = "Section";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"     
      return;
    }
    this.validationError.formValid = true;
    let count = this.sectionList.length;
    if (count == 0) {
      this.sectionList.push({ id: 1, sectionName: sec });
    } else {
      this.sectionList.push({ id: count + 1, sectionName: sec });
    }
    let json = { section: [{ sectionName: sec, chapter: [] }] };
    this.sectionJSON.push(json);
    this.successNotification.visible=true;
    this.successNotification.successMessage = "Section added.";
  }

  onSectionChange(value) {
    this.selectedSection = value;
    this.sectionQuery = this.sectionJSON.find(
      (a) => a.section[0].sectionName == value
    );
  }

  onAddChapter(value) {
     if(this.courseModel.sectionDropdown==''){
      this.validationError.formField = "Choose Section";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    } else if (value === "") {
      this.validationError.formField = "Chapter Name";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    }
    this.validationError.formValid = true;
    let count = this.chapterList.length;
    if (count == 0) {
      this.chapterList.push({ id: 1, chapterName: value, sectionName : this.selectedSection });
    } else {
      this.chapterList.push({ id: count + 1, chapterName: value, sectionName : this.selectedSection });
    }
    if (this.sectionQuery != null) {
      let indexSection = this.sectionJSON.indexOf(this.sectionQuery);
      this.sectionJSON[indexSection].section[0].chapter.push({
        chapterName: value,
        topic: [],
      });
    }
    this.successNotification.visible=true;
    this.successNotification.successMessage = "Chapter added.";
  }

  onChapterChange(value) {
    this.selectedChapter = value;
    this.chapterQuery = this.sectionQuery.section[0].chapter.find( (a) => a.chapterName == value);
  }

  onAddTopic(value) {
    if(this.courseModel.chapterDropdown==''){
      this.validationError.formField = "Choose Chapter";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    }
    else if (value === "") {
      this.validationError.formField = "Topic";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    }
    this.validationError.formValid = true;
    let count = this.topicList.length;
    if (count == 0) {
      this.topicList.push({ id: 1, topicName: value, sectionName : this.selectedTopic, chapterName : this.selectedChapter });
    } else {
      this.topicList.push({ id: count + 1, topicName: value, sectionName : this.selectedTopic, chapterName : this.selectedChapter });
    }
    if (this.chapterQuery != null) {
      this.chapterQuery.topic.push({
        topicName: value,
        paragraph: [],
      });
    }
    this.successNotification.visible=true;
    this.successNotification.successMessage = "Topic added.";
  }

  onTopicChange(value) {
    this.selectedTopic = value;
    this.topicQuery = this.chapterQuery.topic.find( (a) => a.topicName == value);
  }

  onAddParagraph(value) {
    if(this.courseModel.topicDropdown==''){
      this.validationError.formField = "Choose Topic";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    }
    else if (value === "") {
      this.validationError.formField = "Paragraph";
      this.validationError.formValid = false;
      this.validationError.errorMessage = " is required"
      return;
    }
    this.validationError.formValid = true;
    let count = this.paragraphList.length;
    if (count == 0) {
      this.paragraphList.push({ id: 1, paragraphName: value, sectionName : this.selectedTopic, chapterName : this.selectedChapter, topicName: this.selectedTopic });
    } else {
      this.paragraphList.push({ id: count + 1, paragraphName: value, sectionName : this.selectedTopic, chapterName : this.selectedChapter, topicName: this.selectedTopic });
    }
    if (this.topicQuery != null) {
      this.topicQuery.paragraph.push({
        paragraphName: value,
        supportingDocs: '',
      });
    }
    this.successNotification.visible=true;
    this.successNotification.successMessage = "Paragraph added.";
  }

  onParagraphChange(value) {
   this.selectedParagraph = value;
  }

  onSubmit(){
    this.courseModel.sections = this.sectionJSON;
    this.courseModel.userId = this.userId;
    console.log(this.courseModel);
    this.showLoading = true;
    this.courseService.addCourse(this.courseModel).subscribe(res=> {
       console.log(res);
       this.courseModel = {};
       this.sectionJSON = [];
       this.sectionList =[];
       this.topicList = [];
       this.chapterList = [];
       this.paragraphList = [];
       
       this.showLoading = false;
       this.showSuccess =true;
       this.statusMessage=res.message;
       //
    },err => {
      console.log(err);
      this.showSuccess =true;
       this.statusMessage="Something went wrong!";
      this.showLoading = false;
    });
  }
}

//{"section":[{"sectionName":"1","chapter":[{"chapterName":"1","topic":[{"topicName":"some topic","paragraph":[{"paragraphName":"some pargraph","supportingDocs":""}]}]}]}]}";"
