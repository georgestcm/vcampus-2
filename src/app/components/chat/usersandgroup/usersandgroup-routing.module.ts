import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersAndgroupPage } from './usersandgroup.page';

const routes: Routes = [
  {
    path: '',
    component: UsersAndgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersandgroupPageRoutingModule {}
