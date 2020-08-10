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
import { AddTeacherPage } from "./components/add-teacher/add-teacher.page";
import { ViewCoursePage } from "./components/view-course/view-course.page";
import { ChatPage } from "./components/chat/chat/chat.page";
import {CoursesListPage} from './components/courses-list/courses-list.page';
import { AddCoursePage } from './r-teacher/add-course/add-course.page';
import { UsersAndgroupPage } from "./components/chat/usersandgroup/usersandgroup.page";
import { DashboardPage } from './components/dashboard/dashboard.page';
import { StudentCoursePage } from './components/student-course/student-course.page'
import { StudentCourseViewPage } from './components/student-course-view/student-course-view.page'

import { RouteConfig } from "./route.config";
import { AuthService } from "./providers/auth.service";
import { AdminGuard } from "./providers/auth-guards/admin.guard";
import { EditorGuard } from "./providers/auth-guards/editor.guard";
import { SchoolGuard } from "./providers/auth-guards/school.guard";
import { StudentGuard } from "./providers/auth-guards/student.guard";
import { TeacherGuard } from "./providers/auth-guards/teacher.guard";
import { SchoolStaffGuard } from "./providers/auth-guards/schoolstaff.guard";
import { TokenInterceptorService } from "./providers/interceptors/token-interceptor.service";
import { CourseService } from "./providers/common-service/course.service";
import { HttpClientService } from "./providers/http-client.service";
import {MatTreeModule} from '@angular/material/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { CourseDetailModalComponent } from './components/course-detail-modal/course-detail-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadModalComponent } from './components/file-upload-modal/file-upload-modal.component';
let config : SocketIoConfig = {
  url:"http://localhost:4000", options:{}
}

export function createTranslateLoader(http: HttpClient) {
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
    AddSchoolPage,
    REditorPage,
    RSchoolPage,
    AddStaffPage,
    SchoolRegisterPage,
    AddCurriculumPage,
    AddTeacherPage,
    AddSchoolStaffPage,
    ViewCoursePage,
    CoursesListPage,
    AddCoursePage,
    CourseDetailModalComponent,
    FileUploadModalComponent,
    UsersAndgroupPage,
    DashboardPage,
    StudentCoursePage,
    StudentCourseViewPage
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
    FileUploadModalComponent
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
        useFactory: createTranslateLoader,
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
    SchoolStaffGuard,
    HttpClientService,
    DatePipe,
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
