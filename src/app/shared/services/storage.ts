import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { distinctUntilChanged, filter, map, Observable, ReplaySubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: Storage;
  storageObservable = new ReplaySubject<{ key: string, value: any }>();

  /**
   * Constructor
   */
  constructor() {
    this.storage = new Storage({
      name: 'WEDDIPLAN'
    });
    this.storage.create();
  }

  /**
   * Setter function
   */
  async set(key: string, value: any): Promise<void> {
    this.storage.set(key, value);
    this.storageObservable.next({ key, value });
  }

  get<T>(key: string): Observable<T> {
    this.storage.get(key)
      .then((value) => {
        this.storageObservable.next({ key, value });
      })
      .catch(() => {
        this.storageObservable.next({ key, value: null });
      });

    return this.storageObservable.pipe(
      filter((data) => data.key === key),
      map(({ value }) => value as T),
      distinctUntilChanged((oldValue, newValue) => oldValue === newValue),
      shareReplay(1)
    );
  }

  async getP<T>(key: string): Promise<T> {
    return this.storage.get(key);
  }

  async remove(key: string): Promise<boolean> {
    try {
      return (await this.storage.remove(key)).value;
    } catch (e) {
      return false;
    }
  }
}
