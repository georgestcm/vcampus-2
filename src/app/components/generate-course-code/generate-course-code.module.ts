import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from "@ngx-translate/core";
import { IonicModule } from '@ionic/angular';

import { GenerateCourseCodePageRoutingModule } from './generate-course-code-routing.module';

import { GenerateCourseCodePage } from './generate-course-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateCourseCodePageRoutingModule,
    TranslateModule
  ],
  declarations: [GenerateCourseCodePage]
})
export class GenerateCourseCodePageModule {}
