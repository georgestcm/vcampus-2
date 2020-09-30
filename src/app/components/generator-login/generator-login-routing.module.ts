import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratorLoginPage } from './generator-login.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratorLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorLoginPageRoutingModule {}
