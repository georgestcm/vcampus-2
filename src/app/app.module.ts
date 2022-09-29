import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LanguageSelectPage } from "./components/language-select/language-select.page";
import { IonicStorageModule } from "@ionic/storage";
import { AdminPage } from "./admin/admin.page";
import { AdminPermissionPage } from "./adminComponents/admin-permission/admin-permission.page";
import { SchoolListPage } from "./components/school-list/school-list.page";
import { StudentListPage } from "./components/student-list/student-list.page";
import { TeacherListPage } from "./components/teacher-list/teacher-list.page";
import { AddCurriculumPage } from "./components/add-curriculum/add-curriculum.page";
import {GenDashboardPage } from "./components/gen-dashboard/gen-dashboard.page";
import { RSchoolPage } from "./r-school/r-school.page";
import { LoginPage } from "./components/login/login.page";
import { AboutPage } from "./components/about/about.page";
import { ContactPage } from "./components/contact/contact.page";
import { RegisterPage } from "./components/register/register.page";
import { REditorPage } from "./r-editor/r-editor.page";
import { StudentPageCourseListPage } from "./components/student-page-course-list/student-page-course-list.page";
import { AddSchoolPage } from "./components/add-school/add-school.page";
import { RSchoolStaffPage } from "./r-school-staff/r-school-staff.page";
import { RTeacherPage } from "./r-teacher/r-teacher.page";
import { RStudentsPage } from "./r-students/r-students.page";
import { AddStaffPage } from "./components/add-staff/add-staff.page";
import { SchoolRegisterPage } from "./components/school-register/school-register.page";
import { AddSchoolStaffPage } from "./components/add-school-staff/add-school-staff.page";
import { CodeGeneratorPage } from "./components/code-generator/code-generator.page";
import { AddTeacherPage } from "./components/add-teacher/add-teacher.page";
import { ViewCoursePage } from "./components/view-course/view-course.page";
import { ChatPage } from "./components/chat/chat/chat.page";
import {CoursesListPage} from './components/courses-list/courses-list.page';
import { AddCoursePage } from './r-teacher/add-course/add-course.page';
import { UsersAndgroupPage } from "./components/chat/usersandgroup/usersandgroup.page";
import { DashboardPage } from './components/dashboard/dashboard.page';
import { StudentCoursePage } from './components/student-course/student-course.page'
import { StudentCourseViewPage } from './components/student-course-view/student-course-view.page'
import { StaffListPage} from './components/staff-list/staff-list.page';

import { RouteConfig } from "./route.config";
import { AuthService } from "./providers/auth.service";
import { AdminGuard } from "./providers/auth-guards/admin.guard";
import { EditorGuard } from "./providers/auth-guards/editor.guard";
import { SchoolGuard } from "./providers/auth-guards/school.guard";
import { StudentGuard } from "./providers/auth-guards/student.guard";
import { TeacherGuard } from "./providers/auth-guards/teacher.guard";
import { GeneratorGuard} from "./providers/auth-guards/generator.guard";
import { SchoolStaffGuard } from "./providers/auth-guards/schoolstaff.guard";
import { TokenInterceptorService } from "./providers/interceptors/token-interceptor.service";
import { CourseService } from "./providers/common-service/course.service";
import { HttpClientService } from "./providers/http-client.service";
import {MatTreeModule} from '@angular/material/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TeacherService} from 'src/app/components/teacher-list/teacher.service';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { CourseDetailModalComponent } from './components/course-detail-modal/course-detail-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadModalComponent } from './components/file-upload-modal/file-upload-modal.component';
import { EditTeacherModalComponent} from './components/edit-teacher-modal/edit-teacher-modal.component';
import { EditSchoolModalComponent } from './components/edit-school-modal/edit-school-modal.component';
import { EditStaffModalComponent } from './components/edit-staff-modal/edit-staff-modal.component';
import { ChatService } from './providers/chat.service';
import { GenerateCourseCodeModalComponent } from './components/generate-course-code-modal/generate-course-code-modal.component';
import { ExamPage } from './components/exam/exam.page';
import { QuestionModalComponent } from './components/question-modal/question-modal.component';
import { CreateExamPage } from './components/create-exam/create-exam.page';
import { CreateExamModalComponent } from './components/create-exam-modal/create-exam-modal.component';
import { StudentExamPage } from './components/student-exam/student-exam.page';
import { StudentExamModalComponent } from './components/student-exam-modal/student-exam-modal.component';
import { StudentExamStartModalComponent } from './components/student-exam-start-modal/student-exam-start-modal.component';
import { TrueFalseQuestionModalComponent } from './components/true-false-question-modal/true-false-question-modal.component';
import { FillTheBlanksQuestionModalComponent } from './components/fill-the-blanks-question-modal/fill-the-blanks-question-modal.component';
import { AllTrueQuestionModalComponent } from "./components/all-true-question-modal/all-true-question-modal.component";
import { PollQuestionModalComponent } from "./components/poll-question-modal/poll-question-modal.component";
import { GenerateCourseCodePage } from "./components/generate-course-code/generate-course-code.page";
import { UpdateProfilePage } from "./components/update-profile/update-profile.page";
import { MediaListModalComponent } from "./components/media-list-modal/media-list-modal.component";
import { CourseListPage } from "./components/course-list/course-list.page";
import { CurriculumPage } from "./components/curriculum/curriculum.page";
import { environment} from "../environments/environment"
import { CourseShareTeacherModelComponent } from "./components/course-share-teacher-model/course-share-teacher-model.component";
import { CourseSharePage } from "./components/course-share/course-share.page";
import { CollaborationPage } from "./components/collaboration/collaboration.page";
import { OnlineClassPage } from "./components/online-class/online-class.page";
import { MeetingModelComponent } from "./components/meeting-model/meeting-model.component";
import { MultiChoiceQuestionPage } from "./components/multi-choice-question/multi-choice-question.page";
import { CodeGeneratorListsPage } from "./components/code-generator-lists/code-generator-lists.page";

const config: SocketIoConfig = { url: environment.socketURL, options: {} };

export function CreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AboutPage,
    ContactPage,
    RSchoolStaffPage,
    RTeacherPage,
    RStudentsPage,
    RegisterPage,
    LanguageSelectPage,
    AdminPage,
    AdminPermissionPage,
    ChatPage,
    TeacherListPage,
    StudentListPage,
    SchoolListPage,
    StudentPageCourseListPage,
    LoginPage,
    GenDashboardPage,
    AddSchoolPage,
    REditorPage,
    RSchoolPage,
    AddStaffPage,
    SchoolRegisterPage,
    AddCurriculumPage,
    AddTeacherPage,
    AddSchoolStaffPage,
    CodeGeneratorPage,
    ViewCoursePage,
    CoursesListPage,
    AddCoursePage,
    CourseDetailModalComponent,
    FileUploadModalComponent,
    UsersAndgroupPage,
    DashboardPage,
    StudentCoursePage,
    StudentCourseViewPage,
    EditTeacherModalComponent,
    EditSchoolModalComponent,
    StaffListPage,
    EditStaffModalComponent,
    GenerateCourseCodeModalComponent,
    ExamPage,
    QuestionModalComponent,
    CreateExamPage,
    CreateExamModalComponent,
    StudentExamPage,
    StudentExamModalComponent,
    StudentExamStartModalComponent,
    TrueFalseQuestionModalComponent,
    FillTheBlanksQuestionModalComponent,
    AllTrueQuestionModalComponent,
    PollQuestionModalComponent,
    GenerateCourseCodePage,
    UpdateProfilePage,
    MediaListModalComponent,
    CourseListPage,
    CurriculumPage,
    CourseShareTeacherModelComponent,
    CourseSharePage,
    CollaborationPage,
    OnlineClassPage,
    MeetingModelComponent,
    MultiChoiceQuestionPage,
    CodeGeneratorListsPage
  ],
  entryComponents: [
    LanguageSelectPage,
    AdminPage,
    StudentPageCourseListPage,
    AddSchoolPage,
    AddStaffPage,
    SchoolRegisterPage,
    AddCurriculumPage,
    AddTeacherPage,
    AddSchoolStaffPage,
    CourseDetailModalComponent,
    FileUploadModalComponent,
    EditTeacherModalComponent,
    EditSchoolModalComponent,
    EditStaffModalComponent,  
    CodeGeneratorPage,
    GenerateCourseCodeModalComponent,
    QuestionModalComponent,
    CreateExamModalComponent,
    StudentExamModalComponent,
    StudentExamStartModalComponent,
    TrueFalseQuestionModalComponent,
    FillTheBlanksQuestionModalComponent,
    AllTrueQuestionModalComponent,
    PollQuestionModalComponent,
    MediaListModalComponent,
    CourseShareTeacherModelComponent,
    OnlineClassPage,
    MeetingModelComponent,
    MultiChoiceQuestionPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    EditorModule,
    IonicStorageModule.forRoot({
      name: "__mydb",
      driverOrder: ["localstorage", "sqlite", "websql"],
    }),
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    RouteConfig,
    StatusBar,
    SplashScreen,
    AuthService,
    CourseService,
    AdminGuard,
    EditorGuard,
    SchoolGuard,
    StudentGuard,
    TeacherGuard,
    GeneratorGuard,
    SchoolStaffGuard,
    HttpClientService,
    DatePipe,
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    TeacherService,
    ChatService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
