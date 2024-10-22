import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { Task } from './task';
import { StorageService } from '../shared/services/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject([] as Task[]);

  constructor(private storageService: StorageService) {
    this.storageService.getP<Task[]>('tasks').then((tasks) => {
      if (!!tasks) {
        this.tasks$.next(tasks);
      }

      this.tasks$.pipe(
        skip(1)
      ).subscribe((tasks) => {
        this.storageService.set('tasks', tasks);
      })
    });
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(newTask: Task): void {
    this.tasks$.next([...this.tasks$.value, newTask]);
  }

  removeTask(id: string): void {
    this.tasks$.next([...this.tasks$.value.filter((task => task.id !== id))]);
  }

  updateTask(taskUpdated: Task): void {
    const updatedItems = this.tasks$.value.map(item =>
      item.id === taskUpdated.id ? taskUpdated : item
    );
    this.tasks$.next(updatedItems);
  }
}
