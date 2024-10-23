import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  public isEditMode = false;
  public id!: string;
  public label!: string;
  public done!: boolean;
  public form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ])
  });

  public deleteConfirmButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      }
    },
    {
      text: 'Supprimer',
      role: 'confirm',
      handler: () => {
        this.removeTask();
      }
    }
  ];

  constructor(private modalCtrl: ModalController, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.isEditMode = !!this.id;
    this.form.patchValue({ label: this.label, adults: this.done });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    return this.modalCtrl.dismiss({
      id: this.id,
      label: this.form.get('label')?.value,
      done: this.done
    }, 'confirm');
  }

  removeTask() {
    this.tasksService.removeTask(this.id);
    return this.modalCtrl.dismiss(null, 'remove');
  }
}
