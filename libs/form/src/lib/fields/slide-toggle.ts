import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'wt-slide-toggle',
  standalone: true,
  imports: [CommonFieldModule, MatSlideToggleModule],
  template: `
    <div [formGroup]="formGroup">
      <mat-slide-toggle
        #input
        [formControlName]="inputName"
        [data-testid]="inputName"
      >
        {{ label }}
      </mat-slide-toggle>
      <mat-icon matIconPrefix *ngIf="prefixIcon">{{ prefixIcon }}</mat-icon>
      <mat-icon matIconSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
    </div>
  `,
})
export class SlideToggleComponent extends BaseFieldComponent {
  constructor(formGroup: FormGroup) {
    super(formGroup);
  }
}
