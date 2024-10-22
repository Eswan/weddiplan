import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestsService } from '../guests/guests.service';
import { BudgetService } from '../budget/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  totalGuests$: Observable<{
    children: number,
    adults: number
  }>

  totalBudget$: Observable<number>;

  constructor(private guestService: GuestsService, private budgetService: BudgetService) {
    this.totalGuests$ = this.guestService.getCounts();
    this.totalBudget$ = this.budgetService.getCount();
  }
}
