import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Task {
  name: string;
  completed: boolean;
  color: string;
  subtasks?: Task[];
}

@Component({
  selector: 'wt-checkbox-group',
  standalone: true,
  imports: [CommonFieldModule, MatCheckboxModule],
  template: `
    <section class="example-section">
      <span class="example-list-section">
        <mat-checkbox
          class="example-margin"
          [checked]="isAllComplete"
          [color]="task.color"
          [indeterminate]="someComplete()"
          (change)="setAll($event.checked)"
        >
          {{ task.name }}
        </mat-checkbox>
      </span>
      <span class="example-list-section">
        <ul style="list-style: none;">
          @for (subtask of task.subtasks; track subtask) {
          <li>
            <mat-checkbox
              [(ngModel)]="subtask.completed"
              [color]="subtask.color"
              (ngModelChange)="updateAllComplete()"
            >
              {{ subtask.name }}
            </mat-checkbox>
          </li>
          }
        </ul>
      </span>
    </section>
  `,
})
export class CheckboxGroupComponent extends BaseFieldComponent {
  @Input() task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  isAllComplete: boolean = false;

  setControlValue() {
    this.formGroup.get(this.inputName)?.setValue(this.task);
  }
  updateAllComplete() {
    this.isAllComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
    this.setControlValue();
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.isAllComplete
    );
  }

  setAll(completed: boolean) {
    this.isAllComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
    this.setControlValue();
  }
}
