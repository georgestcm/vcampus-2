import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.page.html",
  styleUrls: ["./add-course.page.scss"],
})
export class AddCoursePage implements OnInit {
  constructor() {}
  sectionNumber = 1;
  chapterNumber = 1;
  topicNumber = 1;

  sectionList = [];
  initialLoad = true;
  lastSection = 0;

  totalSections = [];

  ngOnInit() {
    this.addNewSection();
    this.addNewChapter(this.lastSection);
  }

  sectionChanged(eve) {
    document.querySelector("#section_" + eve.target.value).scrollIntoView();
  }

  // function to add new section starts
  addNewSection() {
    var section = {
      sectionNum: this.lastSection + 1,
      sectionName: "",
      chapters: [
        {
          chapterNum: 1,
          chapterName: "",
          topics: [
            {
              topicNum: 1,
              topicName: "",
              paragraphs: [{ paragraphNum: 1, paragraph: "", file: "" }],
            },
          ],
        },
      ],
    };

    this.sectionList.push(section);
    this.lastSection = this.lastSection + 1;
    this.totalSections.push(this.lastSection);
  }
  // function to add new section ends

  addNewChapter(sectionNum) {
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.sectionNum == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var lastChapter =
      selectedSection.chapters[selectedSection.chapters.length - 1];

    if (this.initialLoad) {
      this.initialLoad = false;
      return;
    }

    var newChapter = {
      chapterNum: lastChapter.chapterNum + 1,
      chapterName: "",
      topics: [
        {
          topicNum: 1,
          topicName: "",
          paragraphs: [{ paragraphNum: 1, paragraph: "", file: "" }],
        },
      ],
    };

    this.sectionList[sectionIndex].chapters.push(newChapter);
  }

  addNewTopic(chapterNum, sectionNum) {
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.sectionNum == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var chapterIndex = selectedSection.chapters.findIndex(
      (x) => x.chapterNum == chapterNum
    );
    var selectedChapter = selectedSection.chapters[chapterIndex];

    var lastTopic = selectedChapter.topics[selectedChapter.topics.length - 1];
    var newTopic = {
      topicNum: lastTopic.topicNum + 1,
      topicName: "",
      paragraphs: [{ paragraphNum: 1, paragraph: "", file: "" }],
    };
    this.sectionList[sectionIndex].chapters[chapterIndex].topics.push(newTopic);
  }

  addNewParagraph(topicNum, chapterNum, sectionNum) {
    var sectionIndex = this.sectionList.findIndex(
      (x) => x.sectionNum == sectionNum
    );
    var selectedSection = this.sectionList[sectionIndex];

    var chapterIndex = selectedSection.chapters.findIndex(
      (x) => x.chapterNum == chapterNum
    );
    var selectedChapter = selectedSection.chapters[chapterIndex];

    var topicIndex = selectedChapter.topics.findIndex(
      (x) => x.topicNum == topicNum
    );
    var selectedTopic = selectedChapter.topics[topicIndex];

    var lastParagraph =
      selectedTopic.paragraphs[selectedTopic.paragraphs.length - 1];

    var newParagraph = {
      paragraphNum: lastParagraph.paragraphNum + 1,
      paragraph: "",
      file: "",
    };

    this.sectionList[sectionIndex].chapters[chapterIndex].topics[
      topicIndex
    ].paragraphs.push(newParagraph);
  }

  saveCourse() {
    console.clear();
    console.dirxml(this.sectionList);
    alert("Course Saved..");
  }
}
