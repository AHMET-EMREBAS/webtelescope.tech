import { Component } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'wt-date-field',
  standalone: true,
  imports: [CommonFieldModule, MatDatepickerModule, MatNativeDateModule],
  template: ` <mat-form-field
    style="width: 100%;"
    appearance="outline"
    [formGroup]="formGroup"
  >
    <mat-label>{{ label }}</mat-label>
    <input
      matInput
      [matDatepicker]="picker"
      [formControlName]="inputName"
      [attr.data-test-id]="inputName"
      [attr.aria-required]="required"
    />
    <mat-icon
      [color]="iconColor$ | async"
      class="fill"
      matIconPrefix
      *ngIf="prefixIcon"
    >
      {{ prefixIcon }}
    </mat-icon>
    <mat-icon
      [color]="iconColor$ | async"
      class="fill"
      matIconSuffix
      *ngIf="suffixIcon"
    >
      {{ suffixIcon }}
    </mat-icon>

    <mat-hint>MM/DD/YYYY</mat-hint>
    <mat-error [@enter] [@leave]>
      {{ errors$ | async }}
    </mat-error>

    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>

    <button
      matTextSuffix
      mat-raised-button
      color="primary"
      (click)="updateField()"
      *ngIf="isUpdateField"
    >
      <mat-icon matIconPrefix>update</mat-icon>
      <span> Update </span>
    </button>
  </mat-form-field>`,
})
export class DateFieldComponent extends BaseFieldComponent {}
