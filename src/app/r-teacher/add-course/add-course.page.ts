import { Component, OnInit, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AddCourseModel } from "./add-course.model";
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload';
import { FileUploadModalComponent } from 'src/app/components/file-upload-modal/file-upload-modal.component';
import { ModalController } from '@ionic/angular';

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
  courserId : string;
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:3000/api/course/uploadDocs', itemAlias: 'file'});

  constructor(private courseService: CourseService, 
    private storage : Storage,private route: ActivatedRoute,
    private modalController: ModalController) {}
    schoolList :any;
  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);
     };

    if (this.route.snapshot.paramMap.get('id')) {
      this.courserId = this.route.snapshot.paramMap.get('id');
      this.courseService.getCourse(this.courserId).subscribe( res => {
        console.log(res);
        //this.showModal(res);
        this.prepareModel(res);
      },err => {
        console.log(err);
      });
    }
    
 
    this.storage.get('user').then((val) => {
      this.userId = val._id;
      this.courseService.getSchoolsByTeacherId(this.userId).subscribe(res =>{
       
        this.schoolList = res;
      }, err => {
        console.log(err);
      })
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
    this.courseModel.section="";
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
    this.courseModel.chapter="";
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
    this.courseModel.paragraph="";
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
    this.courseModel.topic="";
  }

  onParagraphChange(value) {
   this.selectedParagraph = value;
  }

  onSchoolChange(value){
    this.courseModel.school = value;
  }

  prepareModel(model){
    this.courseModel.courseName = model.name;
    this.courseModel.subject = model.subject;
    this.courseModel.availableFrom = model.availability_from;
    this.courseModel.availableTo = model.availability_to;
    this.courseModel.description = model.description;
    this.courseModel.repeatYearly = model.is_repeat_yearly;
    for( let i=0; i<model.sections.length; i++){
       this.sectionList.push({id : i+1, sectionName :model.sections[i].section_name});
       for(let j=0; j<model.sections[i].chapters.length; j++){
         this.chapterList.push({id : j+1, chapterName : model.sections[i].chapters[j].chapter_name});
         for( let k =0; k<model.sections[i].chapters[j].topics.length; k++ ){
           this.topicList.push({ id : k+1, topicName : model.sections[i].chapters[j].topics[k].topic_name });
           for( let l =0; l< model.sections[i].chapters[j].topics[k].paragraph.length; l++){
             this.paragraphList.push({ id : l+1, paragraphName : model.sections[i].chapters[j].topics[k].paragraph[l].paragraphName, supportingDocs : model.sections[i].chapters[j].topics[k].paragraph[l].supportingDocs })
           }
         }
       }
    }
  }
  
  onSubmit(){
    this.courseModel.sections = this.sectionJSON;
    this.courseModel.userId = this.userId;
    console.log(this.courseModel);
    this.showLoading = true;
    if(this.courserId == null){
      //Save 
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
         this.getCourseById(res._id);

        //
     },err => {
       console.log(err);
       this.showSuccess =true;
        this.statusMessage="Something went wrong!";
       this.showLoading = false;
     });
    }
    else
    {
      //update
      this.courseService.updateCourse(this.courseModel, this.courserId).subscribe((res) =>{
        console.log(res);
        this.showLoading = false;
        this.showSuccess =true;
        this.statusMessage="Course updated successfully!";
      }, (err)=>{
        this.showSuccess =true;
        this.statusMessage="Something went wrong while updating!";
       this.showLoading = false;
      })
    }
    
  }
  async showModal(data) {
    const modal = await this.modalController.create({
      component: FileUploadModalComponent,
      componentProps : {"courseData":data}
    });
    return await modal.present();
  }
  getCourseById(id){
    this.courseService.getCourse(id).subscribe( res => {
      console.log(res);
      this.showModal(res);
    },err => {
      console.log(err);
    });
  }
}

//{"section":[{"sectionName":"1","chapter":[{"chapterName":"1","topic":[{"topicName":"some topic","paragraph":[{"paragraphName":"some pargraph","supportingDocs":""}]}]}]}]}";"
