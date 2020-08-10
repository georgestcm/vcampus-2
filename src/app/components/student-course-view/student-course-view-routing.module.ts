import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCourseViewPage } from './student-course-view.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCourseViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCourseViewPageRoutingModule {}
