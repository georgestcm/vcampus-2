import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersandgroupPageRoutingModule } from './usersandgroup-routing.module';

import { UsersandgroupPage } from './usersandgroup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersandgroupPageRoutingModule
  ],
  declarations: [UsersandgroupPage]
})
export class UsersandgroupPageModule {}
