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

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CommonFormModule {}

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [CommonFormModule],
  template: `
    <form
      style="display: flex; flex-direction: column; gap: 1em;  width: 100%;"
      #form="ngForm"
      novalidate
      [formGroup]="formGroup"
    >
      <ng-content></ng-content>
      <div style="display: flex; flex-direction: row; gap: 1em;">
        <button
          mat-raised-button
          color="primary"
          type="button"
          (click)="submit()"
        >
          {{ label }}
        </button>
        <button mat-raised-button (click)="reset()" type="button">Reset</button>
      </div>
    </form>
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
