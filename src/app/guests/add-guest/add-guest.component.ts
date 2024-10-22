import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GuestsService } from '../guests.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss'],
})
export class AddGuestComponent implements OnInit {
  public isEditMode = false;
  public id!: string;
  public name!: string;
  public adults!: number;
  public children!: number;

  public deleteConfirmButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Supprimer',
      role: 'confirm',
      handler: () => {
        this.removeGuest();
      },
    },
  ];

  constructor(private modalCtrl: ModalController, private guestsService: GuestsService) {
  }

  ngOnInit() {
    this.isEditMode = !!this.id;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({
      id: this.id,
      name: this.name,
      adults: this.adults,
      children: this.children
    }, 'confirm');
  }

  removeGuest() {
    this.guestsService.removeguest(this.id);
    return this.modalCtrl.dismiss(null, 'remove');
  }
}
