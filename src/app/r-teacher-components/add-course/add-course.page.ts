import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CourseService } from "src/app/providers/common-service/course.service";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.page.html",
  styleUrls: ["./add-course.page.scss"],
})
export class AddCoursePage implements OnInit {
  constructor(private storage: Storage, private _course: CourseService) {}

  course = {
    CourseId: 0,
    CourseName: "",
    Description: "",
    Subject: "",
    UserId: "",
    School: "",
    Curriculum: "",
    AvailabilityFrom: "",
    AvailabilityTo: "",
    IsRepeatYearly: false,
    Sections: [],
  };

  sectionNumber = 1;
  chapterNumber = 1;
  topicNumber = 1;

  sectionList = [];
  initialLoad = true;
  lastSection = 0;
  lastSectionId = "";

  totalSections = [];

  ngOnInit() {
    this.storage.get("user").then((val) => {
      this.course.UserId = val._id;
    });

    debugger;
    this.addNewSection();
    // this.addNewChapter(this.lastSection);
  }

  sectionChanged(eve) {
    document.querySelector("#section_" + eve.target.value).scrollIntoView();
  }

  // function to add new section starts
  addNewSection() {
    var section = this.initializeSection(this.lastSection + 1, 1, 1, 1);

    this.sectionList.push(section);
    this.lastSection = this.lastSection + 1;
    this.totalSections.push(this.lastSection);
  }
  // function to add new section ends

  addNewChapter(sectionNum) {
    debugger;
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.section_no == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var lastChapter =
      selectedSection.chapters[selectedSection.chapters.length - 1];

    // if (this.initialLoad) {
    //   this.initialLoad = false;
    //   return;
    // }

    var newChapter = this.initializeChapter(
      selectedSection.chapters.length + 1,
      1,
      1
    );
    this.sectionList[sectionIndex].chapters.push(newChapter);
  }

  addNewTopic(chapterNum, sectionNum) {
    debugger;
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.section_no == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var chapterIndex = selectedSection.chapters.findIndex(
      (x) => x.chapter_no == chapterNum
    );
    var selectedChapter = selectedSection.chapters[chapterIndex];

    var lastTopic = selectedChapter.topics[selectedChapter.topics.length - 1];

    var newTopic = this.initializeTopic(selectedChapter.topics.length + 1, 1);

    this.sectionList[sectionIndex].chapters[chapterIndex].topics.push(newTopic);
  }

  addNewParagraph(topicNum, chapterNum, sectionNum) {
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.section_no == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var chapterIndex = selectedSection.chapters.findIndex(
      (x) => x.chapter_no == chapterNum
    );
    var selectedChapter = selectedSection.chapters[chapterIndex];

    var topicIndex = selectedChapter.topics.findIndex(
      (x) => x.topic_no == topicNum
    );
    var selectedTopic = selectedChapter.topics[topicIndex];

    var lastParagraph =
      selectedTopic.paragraph[selectedTopic.paragraph.length - 1];

    var newParagraph = this.initializeParagraph(
      selectedTopic.paragraph.length + 1
    );

    this.sectionList[sectionIndex].chapters[chapterIndex].topics[
      topicIndex
    ].paragraph.push(newParagraph);
  }

  initializeSection(section_no, chapter_no, topic_no, paragraph_no) {
    return {
      section_no: section_no,
      section_name: "",
      chapters: [this.initializeChapter(chapter_no, topic_no, paragraph_no)],
    };
  }

  initializeChapter(chapter_no, topic_no, paragraph_no) {
    return {
      chapter_no: chapter_no,
      chapter_name: "",
      topics: [this.initializeTopic(topic_no, paragraph_no)],
    };
  }

  initializeTopic(topic_no, paragraph_no) {
    return {
      topic_no: topic_no,
      topic_name: "",
      paragraph: [this.initializeParagraph(paragraph_no)],
    };
  }

  initializeParagraph(paragraph_no) {
    return {
      paragraph_no: paragraph_no,
      description: "",
      document: "",
    };
  }

  saveCourse() {
    var data = this.course;
    for (let i = 0; i < this.sectionList.length; i++) {
      let section = this.sectionList[i];
      let newSection = {
        SectionId: section.section_no,
        SectionName: section.section_name,
        Chapter: [],
      };

      for (let j = 0; j < section.chapters.length; j++) {
        let chapter = section.chapters[j];
        let newChapter = {
          ChapterId: chapter.chapter_no,
          ChapterName: chapter.chapter_name,
          Topics: [],
        };

        for (let k = 0; k < chapter.topics.length; k++) {
          let topic = chapter.topics[k];
          let newTopic = {
            TopicId: topic.topic_no,
            TopicName: topic.topic_name,
            Paragraph: [],
          };

          for (let l = 0; l < topic.paragraph.length; l++) {
            let para = topic.paragraph[l];
            let newPara = {
              ParagraphDesc: para.description,
              File: para.document,
            };
            newTopic.Paragraph.push(newPara);
          }
          newChapter.Topics.push(newTopic);
        }
        newSection.Chapter.push(newChapter);
      }
      data.Sections.push(newSection);
    }
    console.clear();
    console.dirxml(this.course);

    // var newData = {
    //   CourseId: 0,
    //   UserId: "5ebf8cd2980bbe00173274bd",
    //   CourseName: "CourseName",
    //   Description: "Description",
    //   Subject: "Subject",
    //   School: "School",
    //   Curriculum: "Curriculum",
    //   AvailabilityFrom: "AvailabilityFrom",
    //   AvailabilityTo: "AvailabilityTo",
    //   IsRepeatYearly: true,
    //   Sections: [
    //     {
    //       SectionId: 0,
    //       SectionName: "Section1",
    //       Chapter: [
    //         {
    //           ChapterId: 0,
    //           ChapterName: "Chapter1",
    //           Topics: [
    //             {
    //               TopicId: 0,
    //               TopicName: "Topic1",
    //               Paragraph: [
    //                 {
    //                   ParagraphDesc: "ParagraphDetail1",
    //                   File: "FilePathDetail",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // };
    this._course.addCourse(data).subscribe((res) => {
      debugger
      alert(res.message);
    });
  }
}
