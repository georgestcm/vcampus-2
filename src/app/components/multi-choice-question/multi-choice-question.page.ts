import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

import {  FileUploader } from 'ng2-file-upload';
import { FileUploadModalComponent } from 'src/app/components/file-upload-modal/file-upload-modal.component';
import { DatePipe } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment } from 'src/environments/environment';
import { MediaListModalComponent } from "src/app/components/media-list-modal/media-list-modal.component";

@Component({
  selector: 'app-multi-choice-question',
  templateUrl: './multi-choice-question.page.html',
  styleUrls: ['./multi-choice-question.page.scss'],
})
export class MultiChoiceQuestionPage implements OnInit {

  questionModal = {
    school: "",
    exam: "",
    course: "",
    Question_title: "",
    Question_for :"",
    Question_options :[],
    Correct_answer :"",
    option :"",
  };
  schoolList: [];
  courseList: [];
  loadingSchool = "Loading School...";
  loadingCourse = "--Select Course---";
  courseCodeList: any;
  userId = "";

  fileURL : string="";
  imageList: Array<any> = [];
  mediaList: Array<any> = [];
  documentList: Array<any> = [];
  initMCE :any;
  initMCE2 :any;
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl+'/course/uploadDocs', itemAlias: 'file'});

  constructor(
    private modalController: ModalController,
    public _auth: AuthService,
    private courseService: CourseService,
    private storage : Storage
  ) {}

  ngOnInit() {

    this.initMCE ={
      height: 400,
      menubar: true,
      plugins: [
        'advlist autolink lists link image media charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      image_list: this.imageList,
      block_unsupported_drop: false,
      //media_list:this.mediaList,
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    image_advtab: true,
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    media_live_embeds: true,
    video_template_callback: function(data) {
      // return '<iframe src="' + data.source +
      // '" width="400" height="400" ></iframe>';
      return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
    }
  }

  this.initMCE2 ={
    height: 400,
    menubar: true,
    plugins: [
      'advlist autolink lists link image media charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    image_list: this.imageList,
    block_unsupported_drop: false,
    //media_list:this.mediaList,
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
  image_advtab: true,
  content_css: '//www.tiny.cloud/css/codepen.min.css',
  media_live_embeds: true,
  video_template_callback: function(data) {
    // return '<iframe src="' + data.source +
    // '" width="400" height="400" ></iframe>';
    return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
  }
}

  this.fileURL = environment.apiUrl+"api/course/readFile";
    
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);
     };


     
  
    this.storage.get('user').then((val) => {
      this.userId = val._id;
      this.getAllMediaByUserId();
      this.loadingSchool="---Select School---";
      this.courseService.getSchoolsByTeacherId(this.userId).subscribe(res =>{  
        this.schoolList = res;
        console.log(res);
        this.loadingSchool="---Select School---";
      }, err => {
        console.log(err);
        this.loadingSchool="Error Getting Schol";
      })
    }); 

    //this.getAllCourseCode();
  }

  resetFormField(){
    this.questionModal = {
      school: "",
      exam: "",
      course: "",
      Question_title: "",
      Question_for :"",
      Question_options :[],
      Correct_answer :"",
      option :""
    };
  }

  getAllMediaByUserId(){
    this.imageList=[];
    this.mediaList=[];
    this.documentList=[];
    this.courseService.getMediaByUserId(this.userId).subscribe(res =>{
      console.log('getMediaByUserId',res);
      res.forEach(element => {
        
        if(element.fileName.split('.')[1]=="jpg" || element.fileName.split('.')[1]=="jpeg" || element.fileName.split('.')[1]=="png" || element.fileName.split('.')[1]=="gif"){
          
        this.imageList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
        this.initMCE.image_list = this.mediaList;
        this.initMCE2.image_list = this.mediaList;
      } if(element.fileName.split('.')[1]=="mp4" || element.fileName.split('.')[1]=="webm"){
        this.mediaList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
        //console.log(this.mediaList);
      } if(element.fileName.split('.')[1]=="docx" || element.fileName.split('.')[1]=="pdf"){
        this.documentList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
      }

        //console.log(element);
        //this.imageList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
      });
      this.initMCE.image_list = this.imageList;
      this.initMCE2.image_list = this.imageList;
    });
  }

  async showAddMediaModal() {
    const modal = await this.modalController.create({
      component: FileUploadModalComponent,
      componentProps : {"courseData":null, "userId":this.userId}
    });
    modal.onDidDismiss().then(data => {
      this.imageList=[];
      this.mediaList=[];
      this.documentList=[];
      this.courseService.getMediaByUserId(this.userId).subscribe(res =>{
        console.log(res);
        res.forEach(element => {

          if(element.fileName.split('.')[1]=="jpg" || element.fileName.split('.')[1]=="jpeg" || element.fileName.split('.')[1]=="png"){
            //console.log(this.fileURL+"/"+ element.fileName);           
          this.imageList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
          this.initMCE.image_list = this.mediaList;
        } if(element.fileName.split('.')[1]=="mp4" || element.fileName.split('.')[1]=="webm"){
          this.mediaList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
          //console.log(this.mediaList);
        }if(element.fileName.split('.')[1]=="docx" || element.fileName.split('.')[1]=="pdf"){
          this.documentList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
        }

          //console.log(element);
          //this.imageList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
        });
        this.initMCE.image_list = this.imageList;
        this.initMCE2.image_list = this.imageList;
      });
    });
    return await modal.present();
  }

  async showMediaListModal() {
    
    const modal = await this.modalController.create({
      component: MediaListModalComponent,
      componentProps : {"mediaList":this.mediaList,'documentList' : this.documentList}
    });
    modal.onDidDismiss().then(data => {
     // this.mediaList=[];
      // this.courseService.getMediaByUserId(this.userId).subscribe(res =>{
      //   console.log(res);
      //   res.forEach(element => {
      //     console.log(element);
      //     this.mediaList.push({title :element.title, value : this.fileURL+"/"+ element.fileName});
      //   });
      //   this.initMCE.image_list = this.mediaList;
      //   this.initMCE2.image_list = this.mediaList;
      // });
    });
    return await modal.present();
  }

  onSchoolChange(schoolId) {
    
    this.questionModal.school = schoolId;
    this.loadingCourse = "Loading Course...";
    this.courseService.getCourseBySchoolId(schoolId).subscribe(
      (res) => {
        console.log(res);
        this.courseList = res;
        this.loadingCourse = "---Select Course---";
      },
      (err) => {
        console.log(err);
        this.loadingCourse = "Loading Course...";
      }
    );
  }


  onAddOption(option){
    if(option.length>0){
    this.questionModal.Question_options.push({optionid : this.questionModal.Question_options.length+1, option :option});
    this.questionModal.option = "";
    }

  }

  onSubmit() {
    console.log(this.questionModal);
    this.courseService.saveMultiChoiceQuestion(this.questionModal).subscribe(
      (data) => {
        console.log(data);
        alert("New Question Added!");
       // this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
