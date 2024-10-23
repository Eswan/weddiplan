import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GuestsService } from '../guests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '../guest';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss']
})
export class AddGuestComponent implements OnInit {
  protected readonly STATUS = STATUS;
  public isEditMode = false;
  public id!: string;
  public name!: string;
  public adults!: number;
  public children!: number;
  public status!: number;
  public email!: string;
  public phone!: string;
  public address!: string;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    adults: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(20)
    ]),
    children: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(20)
    ]),
    status: new FormControl(STATUS.PENDING, [
      Validators.required
    ]),
    email: new FormControl('', []),
    phone: new FormControl('', []),
    address: new FormControl('', [])
  });

  public deleteConfirmButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      }
    },
    {
      text: 'Supprimer',
      role: 'confirm',
      handler: () => {
        this.removeGuest();
      }
    }
  ];

  constructor(private modalCtrl: ModalController, private guestsService: GuestsService) {
  }

  ngOnInit() {
    this.isEditMode = !!this.id;
    this.form.patchValue({
      name: this.name,
      adults: this.adults,
      children: this.children,
      status: this.status,
      email: this.email,
      phone: this.phone,
      address: this.address
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    return this.modalCtrl.dismiss({
      id: this.id,
      name: this.form.get('name')?.value,
      adults: this.form.get('adults')?.value,
      children: this.form.get('children')?.value,
      status: this.form.get('status')?.value,
      phone: this.form.get('phone')?.value,
      address: this.form.get('address')?.value,
      email: this.form.get('email')?.value,
    }, 'confirm');
  }

  removeGuest() {
    this.guestsService.removeguest(this.id);
    return this.modalCtrl.dismiss(null, 'remove');
  }
}
