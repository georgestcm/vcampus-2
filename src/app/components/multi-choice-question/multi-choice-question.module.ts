import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiChoiceQuestionPageRoutingModule } from './multi-choice-question-routing.module';

import { MultiChoiceQuestionPage } from './multi-choice-question.page';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditorModule,
    MultiChoiceQuestionPageRoutingModule
  ],
  declarations: []
})
export class MultiChoiceQuestionPageModule {}
