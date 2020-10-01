import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateCourseCodePage } from './generate-course-code.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateCourseCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateCourseCodePageRoutingModule {}
