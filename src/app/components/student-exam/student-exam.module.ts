import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentExamPageRoutingModule } from './student-exam-routing.module';

import { StudentExamPage } from './student-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentExamPageRoutingModule
  ],
  declarations: []
})
export class StudentExamPageModule {}
