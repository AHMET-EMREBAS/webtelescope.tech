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
        [data-testid]="inputName"
      >
        {{ label }}
      </mat-checkbox>
      <mat-icon matIconSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
    </div>
  `,
})
export class CheckboxFieldComponent extends BaseFieldComponent {
  constructor(formGroup: FormGroup) {
    super(formGroup);
  }
}
