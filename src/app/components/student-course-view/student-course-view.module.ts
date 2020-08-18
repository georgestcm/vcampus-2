import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseViewPageRoutingModule } from './student-course-view-routing.module';

import { StudentCourseViewPage } from './student-course-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCourseViewPageRoutingModule
  ],
  declarations: []
})
export class StudentCourseViewPageModule {}
