import { Component, OnInit, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AddCourseModel } from "./add-course.model";
import { CourseService } from 'src/app/providers/common-service/course.service';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload';
import { FileUploadModalComponent } from 'src/app/components/file-upload-modal/file-upload-modal.component';
import { ModalController } from '@ionic/angular';
//import { environment} from '../../../environments/environment'
import { DatePipe } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment } from 'src/environments/environment';

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
  curriculumList : Array<any> =[];
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
  mediaList: Array<any> = [];
  initMCE :any;
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl+'/course/uploadDocs', itemAlias: 'file'});

  constructor(private courseService: CourseService, 
    private storage : Storage,private route: ActivatedRoute,
    private modalController: ModalController, private datepipe: DatePipe) {}
    schoolList :any;
    fileURL : string="";
    ngOnInit() {
      this.initMCE ={
        height: 400,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        image_list: this.mediaList,
        media_list:this.mediaList,
      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
      image_advtab: true,
      content_css: '//www.tiny.cloud/css/codepen.min.css'
      
    }
    this.fileURL = environment.apiUrl+"/course/readFile";
    
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
        this.courseService.getMediaByUserId(this.userId).subscribe(res =>{
          res.forEach(element => {
            this.mediaList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
          });
          this.initMCE.image_list = this.mediaList;
        });
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
    this.courseModel.topicName="";
  }

  onTopicChange(value) {
    this.selectedTopic = value;
    this.topicQuery = this.chapterQuery.topic.find( (a) => a.topicName == value);
  }

  onAddParagraph(value) {
    console.log(value);
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
    this.courseModel.paragraph="";
  }

  onParagraphChange(value) {
   this.selectedParagraph = value;
  }

  onSchoolChange(value){
    this.curriculumList =[];
    this.courseModel.school = value;
    if(value != ""){     
       const list = this.schoolList.find(a => a.school._schoolId==value).school;
       this.curriculumList = list.curriculums;
    }    
  }
  
  onCurriculumChange(value){
    this.courseModel.curriculum = value;
  }
  prepareModel(model){
    this.courseModel.courseName = model.name;
    this.courseModel.subject = model.subject;
    this.courseModel.availableFrom = this.datepipe.transform(model.availability_from, 'yyyy-MM-dd');
    this.courseModel.availableTo = this.datepipe.transform(model.availability_to, 'yyyy-MM-dd');
    this.courseModel.description = model.description;
    this.courseModel.repeatYearly = model.is_repeat_yearly;
    this.courseModel.school = model.school;

    const list = this.schoolList.find(a => a.school._schoolId==model.school).school;
    this.curriculumList = list.curriculums;
    this.courseModel.curriculum = model.curriculum;
    console.log(this.courseModel.school);
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

  onClickAddMedia(){
    this.showAddMediaModal();
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
        //this.getCourseById(res._id);

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

  
  async showAddMediaModal() {
    const modal = await this.modalController.create({
      component: FileUploadModalComponent,
      componentProps : {"courseData":null, "userId":this.userId}
    });
    modal.onDidDismiss().then(data => {
      this.mediaList=[];
      this.courseService.getMediaByUserId(this.userId).subscribe(res =>{
        console.log(res);
        res.forEach(element => {
          console.log(element);
          this.mediaList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
        });
        this.initMCE.image_list = this.mediaList;
      });
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
