 
export interface AddCourseModel {
    courseName : string;
    subject :string;
    description : string;
    availableFrom : string;
    availableTo : string;
    repeatYearly : boolean;
    section: Section[];
}
export interface Section {
    sectionName: string;
    chapter: Chapter[];
}
export interface Chapter {
    chapterName: string;
    topic: Topic[];
}
export interface Topic {
    topicName: string;
    paragraph: Paragraph[];
}
export interface Paragraph {
    paragraphName: string;
    supportingDocs: string;
}
    



