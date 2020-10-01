import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenDashboardPage } from './gen-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: GenDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenDashboardPageRoutingModule {}
