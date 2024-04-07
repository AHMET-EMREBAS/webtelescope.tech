import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'wt-slide-toggle',
  standalone: true,
  imports: [CommonFieldModule, MatSlideToggleModule],
  template: `
    <div
      style="display: flex; flex-direction: row; gap: 1em;"
      [formGroup]="formGroup"
    >
      <mat-label>{{ label }}</mat-label>
      <mat-icon matIconPrefix *ngIf="prefixIcon" color="primary">
        {{ prefixIcon }}
      </mat-icon>
      <mat-slide-toggle
        #input
        [formControlName]="inputName"
        [attr.data-testid]="inputName"
      >
      </mat-slide-toggle>
      <mat-icon matIconSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
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
    </div>
  `,
})
export class SlideToggleComponent extends BaseFieldComponent {}
