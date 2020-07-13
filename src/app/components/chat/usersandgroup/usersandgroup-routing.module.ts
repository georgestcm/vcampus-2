import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersandgroupPage } from './usersandgroup.page';

const routes: Routes = [
  {
    path: '',
    component: UsersandgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersandgroupPageRoutingModule {}
