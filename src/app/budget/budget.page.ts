import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budget.service';
import { Observable } from 'rxjs';
import { Budget } from './budget';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  public budgets$: Observable<Budget[]>;

  constructor(private budgetService: BudgetService) {
    this.budgets$ = this.budgetService.getBudgets();
  }

  ngOnInit() {
  }
}
