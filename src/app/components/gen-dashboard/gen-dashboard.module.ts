import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenDashboardPageRoutingModule } from './gen-dashboard-routing.module';

import { GenDashboardPage } from './gen-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenDashboardPageRoutingModule
  ],
  declarations: []
})
export class GenDashboardPageModule {}
