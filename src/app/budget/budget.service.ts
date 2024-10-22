import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets$: BehaviorSubject<Budget[]> = new BehaviorSubject([{
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
    amount: 2000
  }, {
    id: '4',
    label: 'Robe',
    icon: 'woman-outline',
    amount: 400
  }]);

  constructor() { }

  getBudgets(): Observable<Budget[]> {
    return this.budgets$;
  }

  addBudget(newBudget: Budget): void {
    this.budgets$.next([...this.budgets$.value, newBudget]);
  }

  removeBudget(id: string): void {
    this.budgets$.next([...this.budgets$.value.filter((budget => budget.id !== id))]);
  }

  updateBudget(budgetUpdated: Budget): void {
    const updatedItems = this.budgets$.value.map(item =>
      item.id === budgetUpdated.id ? budgetUpdated : item // Remplace l'item correspondant
    );
    this.budgets$.next(updatedItems);
  }
}
