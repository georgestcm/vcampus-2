import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentExamPage } from './student-exam.page';

const routes: Routes = [
  {
    path: '',
    component: StudentExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentExamPageRoutingModule {}
