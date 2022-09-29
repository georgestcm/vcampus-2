import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeGeneratorListsPageRoutingModule } from './code-generator-lists-routing.module';

import { CodeGeneratorListsPage } from './code-generator-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeGeneratorListsPageRoutingModule
  ],
  declarations: []
})
export class CodeGeneratorListsPageModule {}
