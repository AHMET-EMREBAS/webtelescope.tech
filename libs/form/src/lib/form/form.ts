/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class CommonFormModule {}

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [CommonFormModule],
  styleUrl: './form.style.scss',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h1>{{ formTitle }}</h1>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form
          style="display: flex; flex-direction: column; gap: 1em;  width: 100%;"
          #form="ngForm"
          novalidate
          [formGroup]="formGroup"
        >
          <ng-content></ng-content>
        </form>
      </mat-card-content>

      <mat-card-actions>
        <div style="display: flex; flex-direction: row; gap: 1em;">
          <button
            mat-raised-button
            color="primary"
            type="button"
            (click)="submitForm()"
            [disabled]="formGroup.invalid"
            [attr.data-testid]="submitLabel"
          >
            {{ submitLabel }}
          </button>
          <button
            mat-raised-button
            (click)="resetForm()"
            type="button"
            [attr.data-testid]="'Reset'"
          >
            Reset
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
})
export class FormComponent<T = any> {
  /**
   * Form title
   */
  @Input() formTitle = 'Form Title';

  /**
   * Submit button label
   */
  @Input() submitLabel = 'Submit';

  /**
   * Is update form? If it is an update form, an update button is placed next to each input element.
   */
  @Input() isUpdateForm: boolean = false;

  /**
   * Emit when user click submit button
   */
  @Output() submitEvent = new EventEmitter<T>();

  isSubmitted$ = new BehaviorSubject(false);

  /**
   * Form group
   */
  formGroup!: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  submitForm(value?: T) {
    this.isSubmitted$.next(true);
    this.submitEvent.emit(value ?? this.formGroup.value);
  }

  resetForm() {
    this.isSubmitted$.next(false);
    this.formGroup.reset();
  }
}
