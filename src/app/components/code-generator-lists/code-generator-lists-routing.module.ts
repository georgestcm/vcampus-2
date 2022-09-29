import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeGeneratorListsPage } from './code-generator-lists.page';

const routes: Routes = [
  {
    path: '',
    component: CodeGeneratorListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeGeneratorListsPageRoutingModule {}
