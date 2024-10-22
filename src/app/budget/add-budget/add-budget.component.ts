import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent implements OnInit {
  public isEditMode = false;
  public icons = [
    'heart', 'fast-food-outline', 'car-sport-outline', 'people', 'rose-outline', 'woman-outline'
  ];
  public id!: string;
  public label!: string;
  public amount!: number;
  public selectedIcon!: string;

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
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({
      id: this.id,
      label: this.label,
      amount: this.amount,
      icon: this.selectedIcon
    }, 'confirm');
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  removeBudget() {
    this.budgetService.removeBudget(this.id);
    return this.modalCtrl.dismiss(null, 'remove');
  }
}
