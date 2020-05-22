import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { REditorPage } from './r-editor.page';

const routes: Routes = [
  {
    path: '',
    component: REditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class REditorPageRoutingModule {}
