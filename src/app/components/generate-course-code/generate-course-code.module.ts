import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateCourseCodePageRoutingModule } from './generate-course-code-routing.module';

import { GenerateCourseCodePage } from './generate-course-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateCourseCodePageRoutingModule
  ],
  declarations: [GenerateCourseCodePage]
})
export class GenerateCourseCodePageModule {}
