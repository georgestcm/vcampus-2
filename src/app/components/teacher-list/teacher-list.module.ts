import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherListPageRoutingModule } from './teacher-list-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherListPageRoutingModule
  ],
  declarations: []
})
export class TeacherListPageModule {}
