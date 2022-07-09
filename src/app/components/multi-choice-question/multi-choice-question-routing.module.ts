import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiChoiceQuestionPage } from './multi-choice-question.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MultiChoiceQuestionPage
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiChoiceQuestionPageRoutingModule {}
