import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  BUDGET_LIST: Budget[] = [{
    id: '1',
    label: 'Location de voiture',
    icon: 'car-sport-outline',
    amount: 700
  }, {
    id: '2',
    label: 'Fleurs',
    icon: 'rose-outline',
    amount: 400
  }, {
    id: '3',
    label: 'Nourriture',
    icon: 'fast-food-outline',
    amount: 80,
    amountByPeople: true
  }, {
    id: '4',
    label: 'Robe',
    icon: 'woman-outline',
    amount: 400
  }]

  constructor() { }

  getBudgets(): Observable<Budget[]> {
    return of(this.BUDGET_LIST);
  }
}
