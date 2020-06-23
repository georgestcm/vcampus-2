import { Component, OnInit,Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss']
})
export class AddCoursePage implements OnInit {
   courseModel : any={};
   sectionList : Array<any> =[];
   chapterList : Array<any> =[];
   topicList : Array<any> =[];
   paragraphList:Array<any> =[];
   docList:Array<any> =[];

  constructor() {}
  ngOnInit() {
    this.courseModel={name:'', subject:'',description:'',
    availableFrom:'', availableTo:'',repeatYearly:false, section:'', 
    chapter:'', topic:'',paragraph:'',supportingDocs:'' }
  };
  
  onAddSection(sec){
    if(sec===''){
      return;
    }
    let count = this.sectionList.length;
    if(count ==0){
      this.sectionList.push({id : 1, sectionName : sec});
    }
    else{
      this.sectionList.push({id:(count+1), sectionName : sec});
    }
    this.courseModel.section='';
    alert("added");
  }
  
  onSectionChange(value){
    console.log(value);
  }

  onAddChapter(value){
    if(value===''){
      return;
    }
    let count = this.chapterList.length;
    if(count == 0){
      this.chapterList.push({id : 1, chapterName : value});
    }
    else{
      this.chapterList.push({id:(count+1), chapterName : value});
    }
    console.log(this.chapterList);
    this.courseModel.chapter='';
    alert("added");
  }

  onChpaterChange(value){
    console.log(value);
  }

  onAddTopic(value){
    if(value === ''){
      return;
    }
    let count = this.topicList.length;
    if(count == 0){
      this.topicList.push({id : 1, topicName : value});
    }
    else{
      this.topicList.push({id:(count+1), topicName : value});
    }
    console.log(this.topicList);
    this.courseModel.topic='';
    alert("added");
  }

  onTopicChange(value){
    console.log(value);
  }

  onAddParagraph(value){
    if(value === ''){
      return;
    }
    let count = this.paragraphList.length;
    if(count == 0){
      this.paragraphList.push({id : 1, paragraphName : value});
    }
    else{
      this.paragraphList.push({id:(count+1), paragraphName : value});
    }
    console.log(this.paragraphList);
    this.courseModel.paragraph='';
    alert("added");
  }

  onParagraphChange(value){
    console.log(value);
  }
// public blocks : any[]= [
//   {
//      section:[
//         {
//            sectionName:"1",
//             chapter:[
//               {
//                   chapterName:"1",
//                   topic :[
//                     {
//                         topicName:"some topic",
//                         paragraph:[
//                           {
//                               paragraphName:"some pargraph",
//                               supportingDocs:""
//                           }
//                        ]
//                     }
//                  ]
//               }
//            ]
//         }
//      ]
//   }
// ];

  

}
