import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeGeneratorPage } from './code-generator.page';

const routes: Routes = [
  {
    path: '',
    component: CodeGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeGeneratorPageRoutingModule {}
