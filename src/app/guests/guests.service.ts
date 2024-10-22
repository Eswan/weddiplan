import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { Guest } from './guest';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  private guests$: BehaviorSubject<Guest[]> = new BehaviorSubject([{
    id: '1',
    name: 'Patricia',
    adults: 2,
    children: 0
  }, {
    id: '2',
    name: 'Paulo',
    adults: 2,
    children: 0
  }, {
    id: '3',
    name: 'Claudio',
    adults: 2,
    children: 2
  }, {
    id: '4',
    name: 'Florent & Solenne',
    adults: 2,
    children: 1
  }]);

  constructor() {
  }

  getguests(): Observable<Guest[]> {
    return this.guests$;
  }

  getCounts(): Observable<{ adults: number, children: number }> {
    return this.guests$.pipe(
      map((guests) => guests.reduce((acc, curr) => {
        acc.adults += curr.adults;
        acc.children += curr.children;
        return acc;
      }, { adults: 0, children: 0 })),
      shareReplay()
    )
  }

  addguest(newguest: Guest): void {
    this.guests$.next([...this.guests$.value, newguest]);
  }

  removeguest(id: string): void {
    this.guests$.next([...this.guests$.value.filter((guest => guest.id !== id))]);
  }

  updateguest(guestUpdated: Guest): void {
    const updatedItems = this.guests$.value.map(item =>
      item.id === guestUpdated.id ? guestUpdated : item
    );
    this.guests$.next(updatedItems);
  }
}
