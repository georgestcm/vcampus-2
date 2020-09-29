import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratorLoginPageRoutingModule } from './generator-login-routing.module';

import { GeneratorLoginPage } from './generator-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratorLoginPageRoutingModule
  ],
  declarations: [GeneratorLoginPage]
})
export class GeneratorLoginPageModule {}
