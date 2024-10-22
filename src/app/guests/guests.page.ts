import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable, shareReplay } from 'rxjs';
import { GuestsService } from './guests.service';
import { Guest } from './guest';
import { AddGuestComponent } from './add-guest/add-guest.component';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.page.html',
  styleUrls: ['./guests.page.scss']
})
export class GuestsPage {
  public guests$: Observable<Guest[]>;
  public totalGuests$: Observable<{
    children: number,
    adults: number
  }>

  constructor(private guestService: GuestsService,
              private modalCtrl: ModalController) {
    this.guests$ = this.guestService.getguests();
    this.totalGuests$ = this.guestService.getCounts();
  }

  public async editGuest(guest: Guest): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGuestComponent,
      componentProps: {
        id: guest.id,
        name: guest.name,
        adults: guest.adults,
        children: guest.children
      }
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const budgetUpdated: Guest = {
        id: result.data.id,
        name: result.data.name,
        adults: result.data.adults,
        children: result.data.children
      };

      this.guestService.updateguest(budgetUpdated);
    }
  }

  public async addGuest(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGuestComponent
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const newBudget: Guest = {
        id: Math.random() * 10000 + '',
        name: result.data.name,
        adults: 1,
        children: 0
      };

      this.guestService.addguest(newBudget);
    }
  }
}
