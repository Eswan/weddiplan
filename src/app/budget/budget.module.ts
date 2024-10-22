import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPageRoutingModule } from './budget-routing.module';

import { BudgetPage } from './budget.page';
import { AddBudgetComponent } from './add-budget/add-budget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BudgetPage, AddBudgetComponent]
})
export class BudgetPageModule {}
