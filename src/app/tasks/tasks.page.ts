import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../tasks/task';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { StorageService } from '../shared/services/storage';
import { TasksService } from '../tasks/tasks.service';
import { ModalController } from '@ionic/angular';
import { AddTaskComponent } from '../tasks/add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage {
  public tasks$: Observable<Task[]>;
  readonly panelOpenState = signal(false);

  constructor(private taskService: TasksService,
              private modalCtrl: ModalController) {
    this.tasks$ = this.taskService.getTasks();
  }

  public async editTask(task: Task): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddTaskComponent,
      componentProps: {
        id: task.id,
        label: task.label,
        done: task.done
      }
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const taskUpdated: Task = {
        id: result.data.id,
        label: result.data.label,
        done: result.data.done
      };

      this.taskService.updateTask(taskUpdated);
    }
  }

  public async addTask(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddTaskComponent
    });
    modal.present();

    const result = await modal.onWillDismiss();

    if (result?.data) {
      const newTask: Task = {
        id: Math.random() * 10000 + '',
        label: result.data.label,
        done: false
      };

      this.taskService.addTask(newTask);
    }
  }
}
