/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IID } from '@webpackages/model';
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
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h1>{{ label }} Form</h1>
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
            (click)="submit()"
            [disabled]="formGroup.invalid"
          >
            {{ label }}
          </button>
          <button mat-raised-button (click)="reset()" type="button">
            Reset
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
})
export class FormComponent<T extends IID = any> {
  @Input() label = 'Submit';
  @Output() formSubmit = new EventEmitter<T>();
  submitted$ = new BehaviorSubject(false);

  constructor(public readonly formGroup: FormGroup) {}

  submit() {
    this.submitted$.next(true);
    this.formSubmit.emit(this.formGroup.value);
    console.log(this.formGroup.value);
  }

  reset() {
    this.submitted$.next(false);
    this.formGroup.reset();
    this.formGroup.enable({ emitEvent: true });
  }
}
