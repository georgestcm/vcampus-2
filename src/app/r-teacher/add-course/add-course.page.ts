import { Component, OnInit, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AddCourseModel } from "./add-course.model";

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

  constructor() {}

  ngOnInit() {
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
    };
  }

  onAddSection(sec) {
    if (sec === "") {
      return;
    }
    let count = this.sectionList.length;
    if (count == 0) {
      this.sectionList.push({ id: 1, sectionName: sec });
    } else {
      this.sectionList.push({ id: count + 1, sectionName: sec });
    }
    let json = { section: [{ sectionName: sec, chapter: [] }] };
    this.sectionJSON.push(json);
    alert("added");
  }

  onSectionChange(value) {
    this.sectionQuery = this.sectionJSON.find(
      (a) => a.section[0].sectionName == value
    );
  }

  onAddChapter(value) {
    if (value === "") {
      return;
    }
    let count = this.chapterList.length;
    if (count == 0) {
      this.chapterList.push({ id: 1, chapterName: value });
    } else {
      this.chapterList.push({ id: count + 1, chapterName: value });
    }
    if (this.sectionQuery != null) {
      let indexSection = this.sectionJSON.indexOf(this.sectionQuery);
      this.sectionJSON[indexSection].section[0].chapter.push({
        chapterName: value,
        topic: [],
      });
    }
    alert("added");
  }

  onChapterChange(value) {
    this.chapterQuery = this.sectionQuery.section[0].chapter.find( (a) => a.chapterName == value);
  }

  onAddTopic(value) {
    if (value === "") {
      return;
    }
    let count = this.topicList.length;
    if (count == 0) {
      this.topicList.push({ id: 1, topicName: value });
    } else {
      this.topicList.push({ id: count + 1, topicName: value });
    }
    if (this.chapterQuery != null) {
      this.chapterQuery.topic.push({
        topicName: value,
        paragraph: [],
      });
    }
    alert("added");
  }

  onTopicChange(value) {
    this.topicQuery = this.chapterQuery.topic.find( (a) => a.topicName == value);
  }

  onAddParagraph(value) {
    if (value === "") {
      return;
    }
    let count = this.paragraphList.length;
    if (count == 0) {
      this.paragraphList.push({ id: 1, paragraphName: value });
    } else {
      this.paragraphList.push({ id: count + 1, paragraphName: value });
    }
    if (this.topicQuery != null) {
      this.topicQuery.paragraph.push({
        paragraphName: value,
        supportingDocs: '',
      });
    }
    alert("added");
  }

  onParagraphChange(value) {
    console.log(value);
  }

  prepareModel() {
    let model = {} as AddCourseModel;
  }
  // public blocks: any[] = [
  //   {
  //     section: [
  //       {
  //         sectionName: "1",
  //         chapter: [
  //           {
  //             chapterName: "1",
  //             topic: [
  //               {
  //                 topicName: "some topic",
  //                 paragraph: [
  //                   {
  //                     paragraphName: "some pargraph",
  //                     supportingDocs: "",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
}

//{"section":[{"sectionName":"1","chapter":[{"chapterName":"1","topic":[{"topicName":"some topic","paragraph":[{"paragraphName":"some pargraph","supportingDocs":""}]}]}]}]}";"
