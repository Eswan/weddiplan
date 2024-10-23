import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestsPageRoutingModule } from './guests-routing.module';

import { GuestsPage } from './guests.page';
import { AddGuestComponent } from './add-guest/add-guest.component';
import { GuestsStatsComponent } from './guests-stats/guests-stats.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestsPageRoutingModule,
    ReactiveFormsModule,
    ChartModule
  ],
  declarations: [GuestsPage, AddGuestComponent, GuestsStatsComponent]
})
export class GuestsPageModule {}
