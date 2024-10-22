import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestsPageRoutingModule } from './guests-routing.module';

import { GuestsPage } from './guests.page';
import { AddGuestComponent } from './add-guest/add-guest.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GuestsPage, AddGuestComponent]
})
export class GuestsPageModule {}
