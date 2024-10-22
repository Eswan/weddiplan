import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BudgetService } from '../budget.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import configuration from '../../configuration';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent implements OnInit {
  public isEditMode = false;
  public icons = configuration.icons;
  public id!: string;
  public label!: string;
  public amount!: number;
  public selectedIcon!: string;

  public form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    amount: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99999)
    ]),
    icon: new FormControl('')
  });


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
        this.removeBudget();
      },
    },
  ];

  constructor(private modalCtrl: ModalController, private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.isEditMode = !!this.id;
    this.form.setValue({ label: this.label, amount: this.amount, icon: this.selectedIcon });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if (this.form.valid) {
      this.modalCtrl.dismiss({
        id: this.id,
        label: this.form.get('label')?.value,
        amount: this.form.get('amount')?.value,
        icon: this.selectedIcon
      }, 'confirm');
    } else {
      this.form.markAllAsTouched();
    }
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  removeBudget() {
    this.budgetService.removeBudget(this.id);
    return this.modalCtrl.dismiss(null, 'remove');
  }
}
