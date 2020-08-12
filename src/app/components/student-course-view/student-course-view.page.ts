import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/providers/common-service/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.page.html',
  styleUrls: ['./student-course-view.page.scss'],
})
export class StudentCourseViewPage implements OnInit {

  courseId : any;
  paragraphList : Array<any> =[];
  content : any;
  counter =0;
  constructor(private courseService: CourseService, 
    private route: ActivatedRoute) { }


  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.courseId = this.route.snapshot.paramMap.get('id');
      this.courseService.getCourse(this.courseId).subscribe( res => {
        console.log(res);
        this.prepareParagraph(res);
      },err => {
        console.log(err);
      });
    }
  }
  prepareParagraph(model){
    for( let i=0; i<model.sections.length; i++){
      //this.sectionList.push({id : i+1, sectionName :model.sections[i].section_name});
      for(let j=0; j<model.sections[i].chapters.length; j++){
        //this.chapterList.push({id : j+1, chapterName : model.sections[i].chapters[j].chapter_name});
        for( let k =0; k<model.sections[i].chapters[j].topics.length; k++ ){
          //this.topicList.push({ id : k+1, topicName : model.sections[i].chapters[j].topics[k].topic_name });
          for( let l =0; l< model.sections[i].chapters[j].topics[k].paragraph.length; l++){
            this.counter+=1;
            this.paragraphList.push({ id : l+1, title : +this.counter+" Paragraph", paragraphName : model.sections[i].chapters[j].topics[k].paragraph[l].paragraphName, supportingDocs : model.sections[i].chapters[j].topics[k].paragraph[l].supportingDocs })
          }
        }
      }
   }
  }

  onItemClick(paragraph){
    this.content = paragraph.paragraphName;
  }

}
