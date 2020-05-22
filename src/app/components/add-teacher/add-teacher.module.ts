import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeacherPageRoutingModule } from './add-teacher-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTeacherPageRoutingModule
  ],
  declarations: []
})
export class AddTeacherPageModule {}
