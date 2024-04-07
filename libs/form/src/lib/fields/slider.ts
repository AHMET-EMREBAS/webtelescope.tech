import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'wt-slider',
  standalone: true,
  imports: [CommonFieldModule, MatSliderModule],
  template: `
    <div
      style="display: flex; flex-direction: row; gap: 1em; align-items: center;"
      [formGroup]="formGroup"
    >
      <mat-label matTextPrefix>{{ label }}</mat-label>
      <mat-icon *ngIf="prefixIcon" color="primary" class="fill">
        {{ prefixIcon }}
      </mat-icon>
      <mat-slider
        [discrete]="true"
        [min]="min"
        [max]="max"
        [step]="1"
        [showTickMarks]="true"
        [attr.data-testid]="inputName"
      >
        <input #input matSliderThumb [formControlName]="inputName" />
      </mat-slider>

      <strong matTextSuffix> {{ input.value }}</strong>

      <mat-icon *ngIf="suffixIcon" color="primary" class="fill">
        {{ suffixIcon }}
      </mat-icon>

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
export class SliderComponent extends BaseFieldComponent {
  @Input() min = 0;
  @Input() max = 100;
}
