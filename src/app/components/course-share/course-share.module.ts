import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseSharePageRoutingModule } from './course-share-routing.module';

import { CourseSharePage } from './course-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseSharePageRoutingModule
  ],
  declarations: []
})
export class CourseSharePageModule {}
