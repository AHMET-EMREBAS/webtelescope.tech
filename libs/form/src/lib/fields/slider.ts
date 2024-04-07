import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
      <mat-icon *ngIf="prefixIcon" color="primary" class="fill">
        {{ prefixIcon }}
      </mat-icon>
      <mat-slider
        #input
        [discrete]="true"
        [min]="min"
        [max]="max"
        [showTickMarks]="true"
      >
        <input matSliderThumb [formControlName]="inputName" />
      </mat-slider>
      <mat-icon *ngIf="suffixIcon" color="primary" class="fill">
        {{ suffixIcon }}
      </mat-icon>
    </div>
  `,
})
export class SliderComponent extends BaseFieldComponent {
  @Input() min = 0;
  @Input() max = 100;
  constructor(@Inject(FormGroup) formGroup: FormGroup) {
    super(formGroup);
  }
}
