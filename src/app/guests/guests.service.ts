import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, skip } from 'rxjs';
import { Guest } from './guest';
import { Budget } from '../budget/budget';
import { StorageService } from '../shared/services/storage';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  private guests$: BehaviorSubject<Guest[]> = new BehaviorSubject([] as Guest[]);

  constructor(private storageService: StorageService) {
    this.storageService.getP<Guest[]>('guests').then((guests) => {
      if (!!guests) {
        this.guests$.next(guests);
      }

      this.guests$.pipe(
        skip(1)
      ).subscribe((guests) => {
        this.storageService.set('guests', guests);
      })
    });
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
