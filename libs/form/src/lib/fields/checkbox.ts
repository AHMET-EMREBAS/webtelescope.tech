import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'wt-checkbox',
  standalone: true,
  imports: [CommonFieldModule, MatCheckboxModule],
  template: `
    <div
      style="display: flex; flex-direction: row; gap: 1em; align-items: center;"
      [formGroup]="formGroup"
    >
      <mat-icon *ngIf="prefixIcon" color="primary" class="fill">
        {{ prefixIcon }}
      </mat-icon>
      <mat-checkbox
        matInput
        [formControlName]="inputName"
        [attr.data-testid]="inputName"
      >
        {{ label }}
      </mat-checkbox>

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

      <mat-icon matIconSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
    </div>
  `,
})
export class CheckboxFieldComponent extends BaseFieldComponent {}
