import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCoursePageRoutingModule } from './student-course-routing.module';

import { StudentCoursePage } from './student-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCoursePageRoutingModule
  ],
  declarations: []
})
export class StudentCoursePageModule {}
