import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable, shareReplay } from 'rxjs';
import { GuestsService } from './guests.service';
import { Guest } from './guest';
import { AddGuestComponent } from './add-guest/add-guest.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.page.html',
  styleUrls: ['./guests.page.scss'],
})
export class GuestsPage {
  public guests$: Observable<Guest[]>;
  public totalGuests$: Observable<{
    children: number,
    adults: number
  }>

  constructor(private guestService: GuestsService,
              private modalCtrl: ModalController,
              private router: Router) {
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
        children: guest.children,
        status: guest.status,
        email: guest.email,
        phone: guest.phone,
        address: guest.address,
      }
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const guestUpdated: Guest = {
        id: result.data.id,
        name: result.data.name,
        adults: result.data.adults,
        children: result.data.children,
        status: result.data.status,
        email: result.data.email,
        phone: result.data.phone,
        address: result.data.address,
      };

      this.guestService.updateguest(guestUpdated);
    }
  }

  public async addGuest(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGuestComponent
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const newGuest: Guest = {
        id: Math.random() * 10000 + '',
        name: result.data.name,
        adults: result.data.adults,
        children: result.data.children,
        status: result.data.status,
        email: result.data.email,
        phone: result.data.phone,
        address: result.data.address,
      };

      this.guestService.addguest(newGuest);
    }
  }

  goToStats() {
    this.router.navigate(['guests/stats'])
  }
}
