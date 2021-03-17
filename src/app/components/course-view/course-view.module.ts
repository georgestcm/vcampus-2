import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseViewPageRoutingModule } from './course-view-routing.module';

import { CourseViewPage } from './course-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseViewPageRoutingModule
  ],
  declarations: [CourseViewPage]
})
export class CourseViewPageModule {}
