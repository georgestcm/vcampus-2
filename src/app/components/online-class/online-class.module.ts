import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineClassPageRoutingModule } from './online-class-routing.module';

import { OnlineClassPage } from './online-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineClassPageRoutingModule
  ],
  declarations: []
})
export class OnlineClassPageModule {}
