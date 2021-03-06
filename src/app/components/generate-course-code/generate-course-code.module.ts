import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from "@ngx-translate/core";
import { IonicModule } from '@ionic/angular';

import { GenerateCourseCodePageRoutingModule } from './generate-course-code-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateCourseCodePageRoutingModule,
    TranslateModule
  ],
  declarations: []
})
export class GenerateCourseCodePageModule {}
