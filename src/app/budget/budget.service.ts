import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay, skip } from 'rxjs';
import { Budget } from './budget';
import { StorageService } from '../shared/services/storage';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets$: BehaviorSubject<Budget[]> = new BehaviorSubject<Budget[]>([]);

  constructor(private storageService: StorageService) {
    this.storageService.getP<Budget[]>('budgets').then((budgets) => {
      if (!!budgets) {
        this.budgets$.next(budgets);
      }

      this.budgets$.pipe(
        skip(1)
      ).subscribe((budgets) => {
        this.storageService.set('budgets', budgets);
      })
    });
  }

  getBudgets(): Observable<Budget[]> {
    return this.budgets$;
  }

  getCount(): Observable<number> {
    return this.budgets$.pipe(
      map((budgets) => budgets.reduce((acc, curr) => acc + curr.amount, 0)),
      shareReplay()
    );
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
