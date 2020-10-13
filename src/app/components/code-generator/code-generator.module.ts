import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeGeneratorPageRoutingModule } from './code-generator-routing.module';

import { CodeGeneratorPage } from './code-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeGeneratorPageRoutingModule
  ],
  declarations: []
})
export class CodeGeneratorPageModule {}
