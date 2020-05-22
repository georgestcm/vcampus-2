import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPermissionPageRoutingModule } from './admin-permission-routing.module';

import { AdminPermissionPage } from './admin-permission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPermissionPageRoutingModule
  ],
  declarations: []
})
export class AdminPermissionPageModule {}
