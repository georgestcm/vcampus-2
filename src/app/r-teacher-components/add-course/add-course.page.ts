import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CourseService } from "src/app/providers/common-service/course.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.page.html",
  styleUrls: ["./add-course.page.scss"],
})
export class AddCoursePage implements OnInit {
  constructor(
    private storage: Storage,
    private _course: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  course = {
    _id: "",
    name: "",
    description: "",
    subject: "",
    user: "",
    school: "",
    curriculum: "",
    availability_from: "",
    availability_to: "",
    is_repeat_yearly: false,
    sections: [],
    Sections: [],
  };

  sectionList = [];
  lastSection = 0;
  lastSectionId = "";
  courseId = "";
  userId = "";
  totalSections = [];

  ngOnInit() {
    this.storage.get("user").then((val) => {
      this.course.user = val._id;
      this.userId = val._id;
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = params.get("id");
      this.getCourse(this.courseId);
    });
    this.addNewSection();
  }

  getCourse(courseId) {
    let data = { id: courseId };
    this._course.getCourse(data).subscribe((res) => {
      debugger
      this.course = res;

      this.sectionList = res.sections;
    });
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
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.section_no == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var lastChapter =
      selectedSection.chapters[selectedSection.chapters.length - 1];

    var newChapter = this.initializeChapter(
      selectedSection.chapters.length + 1,
      1,
      1
    );
    this.sectionList[sectionIndex].chapters.push(newChapter);
  }

  addNewTopic(chapterNum, sectionNum) {
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
    debugger;
    var data = {
      UserId: this.userId,
      CourseId: this.courseId,
      CourseName: this.course.name,
      Description: this.course.description,
      Subject: this.course.subject,
      School: this.course.school,
      Curriculum: this.course.curriculum,
      AvailabilityFrom: this.course.availability_from,
      AvailabilityTo: this.course.availability_to,
      IsRepeatYearly: this.course.is_repeat_yearly,
      Sections:[]
    };
    for (let i = 0; i < this.sectionList.length; i++) {
      let section = this.sectionList[i];
      let newSection = {
        SectionId: section._id,
        SectionName: section.section_name,
        Chapter: [],
      };

      for (let j = 0; j < section.chapters.length; j++) {
        let chapter = section.chapters[j];
        let newChapter = {
          ChapterId: chapter._id,
          ChapterName: chapter.chapter_name,
          Topics: [],
        };

        for (let k = 0; k < chapter.topics.length; k++) {
          let topic = chapter.topics[k];
          let newTopic = {
            TopicId: topic._id,
            TopicName: topic.topic_name,
            Paragraph: [],
          };

          for (let l = 0; l < topic.paragraph.length; l++) {
            let para = topic.paragraph[l];
            let newPara = {
              description: para.description,
              document: para.document,
            };
            newTopic.Paragraph.push(newPara);
          }
          newChapter.Topics.push(newTopic);
        }
        newSection.Chapter.push(newChapter);
      }
      data.Sections.push(newSection);
    }

    if (
      this.courseId == "" ||
      this.courseId == null ||
      this.courseId == undefined
    ) {
      this._course.addCourse(data).subscribe((res) => {
        delete data.CourseId;
        alert(res.message);
      });
    } else {
      this._course.updateCourse(data, this.courseId).subscribe((res) => {
        alert(res.message);
      });
    }
  }
}
