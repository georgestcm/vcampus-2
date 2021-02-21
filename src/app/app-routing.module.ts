import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AdminPage } from "./admin/admin.page";
import { AdminPermissionPage } from "./adminComponents/admin-permission/admin-permission.page";
import { SchoolListPage } from "./components/school-list/school-list.page";
import { StudentListPage } from "./components/student-list/student-list.page";
import { TeacherListPage } from "./components/teacher-list/teacher-list.page";
import { LoginPage } from "./components/login/login.page";
import { REditorPage } from "./r-editor/r-editor.page";
import { RSchoolPage } from "./r-school/r-school.page";
import { RSchoolStaffPage } from "./r-school-staff/r-school-staff.page";
import { RTeacherPage } from "./r-teacher/r-teacher.page";
import { RStudentsPage } from "./r-students/r-students.page";
import { AboutPage } from "./components/about/about.page";
import {GenDashboardPage } from "./components/gen-dashboard/gen-dashboard.page";
import { ContactPage } from "./components/contact/contact.page";
import { RegisterPage } from "./components/register/register.page";
import { StudentPageCourseListPage } from "./components/student-page-course-list/student-page-course-list.page";
import { AdminGuard } from "./providers/auth-guards/admin.guard";
import { EditorGuard } from "./providers/auth-guards/editor.guard";
import { SchoolGuard } from "./providers/auth-guards/school.guard";
import { SchoolStaffGuard } from "./providers/auth-guards/schoolstaff.guard";
import { GeneratorGuard} from "./providers/auth-guards/generator.guard";
import { TeacherGuard } from "./providers/auth-guards/teacher.guard";
import { StudentGuard } from "./providers/auth-guards/student.guard";
 import { ChatPage } from "./components/chat/chat/chat.page";
// import { GroupChatPage } from "./components/chat/group-chat/group-chat.page";
import { CoursesListPage } from './components/courses-list/courses-list.page';
import { AddCoursePage } from './r-teacher/add-course/add-course.page';
import { UsersAndgroupPage } from "./components/chat/usersandgroup/usersandgroup.page";
import { DashboardPage } from './components/dashboard/dashboard.page';
import { StudentCoursePage } from './components/student-course/student-course.page';
import { StudentCourseViewPage } from './components/student-course-view/student-course-view.page';
import { StaffListPage } from './components/staff-list/staff-list.page';
import { GeneratorLoginPage } from './components/generator-login/generator-login.page';
import { ExamPage } from './components/exam/exam.page';
import { CreateExamPage } from './components/create-exam/create-exam.page';
import { StudentExamPage } from './components/student-exam/student-exam.page';
import { GenerateCourseCodePage } from "./components/generate-course-code/generate-course-code.page";
import { UpdateProfilePage } from "./components/update-profile/update-profile.page";


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "admin",
    redirectTo: "admin/school-list",
    pathMatch: "full",
  },
  {
    path: "editor",
    redirectTo: "editor/school-list",
    pathMatch: "full",
  },
  {
    path: "rschool",
    redirectTo: "rschool/permissions",
    pathMatch: "full",
  },
  {
    path: "rschoolstaff",
    redirectTo: "rschoolstaff/courses-list",
    pathMatch: "full",
  },
  {
    path: "rteacher",
    redirectTo: "rteacher/courses-list",
    pathMatch: "full",
  },
  {
    path: "rstudents",
    redirectTo: "rstudents/courses-list",
    pathMatch: "full",
  },
  {
    path: "admin",
    component: AdminPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: "school-list",
        component: SchoolListPage,
        pathMatch: "full",
      },
      {
        path: "student-list",
        component: StudentListPage,
        pathMatch: "full",
      },
      {
        path: "teacher-list",
        component: TeacherListPage,
        pathMatch: "full",
      },
      {
        path: "courses-list",
        //component: CoursesListPage,
        component: StudentCoursePage,
        pathMatch: "full",
      },
      {
        path: "permissions",
        component: AdminPermissionPage,
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
       {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "student-course-view",
        component: StudentCourseViewPage,
        pathMatch: "full",
      },
      {
        path: "staff-list",
        component: StaffListPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      }
    ],
  },
  {
    path: "editor",
    component: REditorPage,
    canActivate: [EditorGuard],
    children: [
      {
        path: "school-list",
        component: SchoolListPage,
        pathMatch: "full",
      },
      {
        path: "student-list",
        component: StudentListPage,
        pathMatch: "full",
      },
      {
        path: "teacher-list",
        component: TeacherListPage,
        pathMatch: "full",
      },

      {
        path: "permissions",
        component: AdminPermissionPage,
        pathMatch: "full",
      },
      {
        path: "courses-list",
        component: StudentCoursePage,
        //component: CoursesListPage,
        pathMatch: "full",
      },
      {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
      {
        path: "student-course-view",
        component: StudentCourseViewPage,
        pathMatch: "full",
      },
      {
        path: "staff-list",
        component: StaffListPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      }
    ],
  },
  {
    path: "rschool",
    component: RSchoolPage,
    canActivate: [SchoolGuard],
    children: [
      {
        path: "student-list",
        component: StudentListPage,
        pathMatch: "full",
      },
      {
        path: "teacher-list",
        component: TeacherListPage,
        pathMatch: "full",
      },

      {
        path: "permissions",
        component: AdminPermissionPage,
        pathMatch: "full",
      },
      {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
      {
        path: "courses-list",
        component: StudentCoursePage,
        //component: CoursesListPage,
        pathMatch: "full",
      },
      {
        path: "student-course-view",
        component: StudentCourseViewPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      }
    ],
  },
  {
    path: "rschoolstaff",
    component: RSchoolStaffPage,
    canActivate: [SchoolStaffGuard],
    children: [
      {
        path: "student-list",
        component: StudentListPage,
        pathMatch: "full",
      },
      {
        path: "teacher-list",
        component: TeacherListPage,
        pathMatch: "full",
      },

      {
        path: "permissions",
        component: AdminPermissionPage,
        pathMatch: "full",
      },
      {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
      {
        path: "courses-list",
        component: StudentCoursePage,//CoursesListPage,
        pathMatch: "full",
      },
      {
        path: "student-course-view",
        component: StudentCourseViewPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      }
    ],
  },
  {
    path: "rteacher",
    component: RTeacherPage,
    canActivate: [TeacherGuard],
    children: [

      {
        path:"courses-list/add-course",
        component:AddCoursePage
      },
      {
        path: 'courses-list',
        component: CoursesListPage
      },
      {
        path: "permissions",
        component: AdminPermissionPage,
        pathMatch: "full",
      },
      {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
      {
        path: "exam",
        component: ExamPage,
        pathMatch: "full",
      },
      {
        path: "exam/create-exam",
        component: CreateExamPage, 
      },
      {//needs to remove this
        path: "student-exam",
        component: StudentExamPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      },
      {
        path: "student-list",
        component: StudentListPage,
        pathMatch: "full",
      },
      {
        path: "school-list",
        component: SchoolListPage,
        pathMatch: "full",
      },
    ],
  },
  {
    path: "rstudents",
    component: RStudentsPage,
    canActivate: [StudentGuard],
    children: [
      {
        path: "chat",
        component: ChatPage,
        pathMatch: "full",
      },
      {
        path :"usersandgroup",
        component:UsersAndgroupPage,
        pathMatch:"full"
      },
      {
        path: "dashboard",
        component: DashboardPage,
        pathMatch: "full",
      },
      {
        path: "student-course",
        component: StudentCoursePage,
        pathMatch: "full",
      },
      {
        path: "student-course-view",
        component: StudentCourseViewPage,
        pathMatch: "full",
      },
      {
        path: "student-exam",
        component: StudentExamPage,
        pathMatch: "full",
      },
      {
        path: "update-profile",
          component: UpdateProfilePage,
          pathMatch: "full",
      }
    ],
  },
  // {
  //   path: "generator",
  //   component: GeneratorLoginPage,
  //   //canActivate: [StudentGuard],
  //   children: [
  //     {
  //       path: "gen_dashboard",
  //       component: ChatPage,
  //       pathMatch: "full",
  //     },
  //   ],
  // },
  {
    path: "register",
    component: RegisterPage,
    pathMatch: "full",
    children: [
      {
        path: "student-page-course-list",
        component: StudentPageCourseListPage,
        pathMatch: "full",
      },
    ],
  },
  {
    path: "about",
    component: AboutPage,
    pathMatch: "full",
  },
  {
    path: "contact",
    component: ContactPage,
    pathMatch: "full",
  },
  {
    path: "add-staff",
    loadChildren: () =>
      import("./components/add-staff/add-staff.module").then(
        (m) => m.AddStaffPageModule
      ),
  },
  {
    path: "school-register",
    loadChildren: () =>
      import("./components/school-register/school-register.module").then(
        (m) => m.SchoolRegisterPageModule
      ),
  },
  {
    path: "add-curriculum",
    loadChildren: () =>
      import("./components/add-curriculum/add-curriculum.module").then(
        (m) => m.AddCurriculumPageModule
      ),
  },
  {
    path: "add-teacher",
    loadChildren: () =>
      import("./components/add-teacher/add-teacher.module").then(
        (m) => m.AddTeacherPageModule
      ),
  },
  {
    path: "add-school-staff",
    loadChildren: () =>
      import("./components/add-school-staff/add-school-staff.module").then(
        (m) => m.AddSchoolStaffPageModule
      ),
  },
  {
    path: "view-course",
    loadChildren: () =>
      import("./components/view-course/view-course.module").then(
        (m) => m.ViewCoursePageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'student-course',
    loadChildren: () => import('./components/student-course/student-course.module').then( m => m.StudentCoursePageModule)
  },
  {
    path: 'student-course-view',
    loadChildren: () => import('./components/student-course-view/student-course-view.module').then( m => m.StudentCourseViewPageModule)
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./components/staff-list/staff-list.module').then( m => m.StaffListPageModule)
  },
  {
    path: 'generator',
    loadChildren: () => import('./components/generator-login/generator-login.module').then( m => m.GeneratorLoginPageModule)
  },
  {
    path: 'gen-dashboard',
    component: GenDashboardPage,
    canActivate:[GeneratorGuard],
    children :[{
      path: "generate-course-code",
        component: GenerateCourseCodePage,
        pathMatch: "full",
    },
    {
      path: "update-profile",
        component: UpdateProfilePage,
        pathMatch: "full",
    }]

  },
  {
    path: 'generate-course-code',
    loadChildren: () => import('./components/generate-course-code/generate-course-code.module').then( m => m.GenerateCourseCodePageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./components/exam/exam.module').then( m => m.ExamPageModule)
  },
  {
    path: 'create-exam',
    loadChildren: () => import('./components/create-exam/create-exam.module').then( m => m.CreateExamPageModule)
  },
  {
    path: 'student-exam',
    loadChildren: () => import('./components/student-exam/student-exam.module').then( m => m.StudentExamPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./components/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },












  // {
  //   path: 'chat',
  //   loadChildren: () => import('./components/chat/chat/chat.module').then( m => m.ChatPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
