import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budget.service';
import { map, Observable, shareReplay } from 'rxjs';
import { Budget } from './budget';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss']
})
export class BudgetPage {
  public budgets$: Observable<Budget[]>;
  public totalBudget$: Observable<number>;

  constructor(private budgetService: BudgetService,
              private modalCtrl: ModalController) {
    this.budgets$ = this.budgetService.getBudgets();
    this.totalBudget$ = this.budgets$.pipe(
      map((budgets) => budgets.reduce((acc, curr) => acc + curr.amount, 0)),
      shareReplay()
    );
  }

  public async editBudget(budget: Budget): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddBudgetComponent,
      componentProps: {
        id: budget.id,
        amount: budget.amount,
        selectedIcon: budget.icon,
        label: budget.label
      }
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const budgetUpdated: Budget = {
        id: result.data.id,
        amount: result.data.amount,
        label: result.data.label,
        icon: result.data.icon
      };

      this.budgetService.updateBudget(budgetUpdated);
    }
  }

  public async addBudget(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddBudgetComponent
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const newBudget: Budget = {
        id: Math.random() * 10000 + '',
        amount: result.data.amount,
        label: result.data.label,
        icon: result.data.icon
      };

      this.budgetService.addBudget(newBudget);
    }
  }
}
