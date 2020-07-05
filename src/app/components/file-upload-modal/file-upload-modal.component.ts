import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {  FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { HttpClientService } from 'src/app/providers/http-client.service';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss'],
})
export class FileUploadModalComponent implements OnInit {

  courseData : any= {};
  topicList: Array<any> = [];
  paragraphList : Array<any> = [];
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl+'/course/uploadDocs', itemAlias: 'file'});
  filesToUpload: Array<File> = [];
  topicId : string;
  paragraphId : string;
  fileUploaded =false;
  message ="";
  fileName = "";

  constructor(private modalController: ModalController, 
    private navParams: NavParams, private http: HttpClientService) {
    //console.log(navParams.get('courseData'));
    this.courseData = navParams.get('courseData');
    this.prepareModal(this.courseData);
   }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.fileUploaded =true;
      if(status ==200){
        this.message= "File uploaded successfully."
      }
      else{
        this.message= "Something went wrong! please try again later."
      }
  };
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}
prepareModal(course){
  for(let i=0; i<course.sections.length; i++){
      for(let j=0; j<course.sections[i].chapters.length; j++){
        for(let k=0; k< course.sections[i].chapters[j].topics.length; k++){
          this.topicList.push(course.sections[i].chapters[j].topics[k]);
        }
      }
  }
  console.log(this.topicList);
}

onTopicChange(id){
  this.paragraphList =[];
  this.topicId = id;
 for(let i=0; i<this.topicList.length; i++){
   if(this.topicList[i]._id == id){
    console.log(this.topicList[i].paragraph);
    for(let j=0; j< this.topicList[i].paragraph.length; j++){
      this.paragraphList.push(this.topicList[i].paragraph[j]);
    }  
   }
 }
}
onParagraphChange(id){
  this.paragraphId = id;
console.log(id);
}

onUpload(){
  if(this.topicId ==null && this.paragraphId == null){
    alert("Topic & Paragraph Selection is required.");
    return;
  }
  this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    form.append('topicId' , this.topicId);
    form.append('paragraphId' , this.paragraphId);
   };
  this.uploader.uploadAll();
  this.fileName="";
}
onFileChange(event) {    
  this.fileName = event.target.files[0].name;
}
}
