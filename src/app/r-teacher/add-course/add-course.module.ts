import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCoursePageRoutingModule } from './add-course-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCoursePageRoutingModule,
    NgbModule
  ],
  declarations: []
})
export class AddCoursePageModule {}
