import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-number-field',
  standalone: true,
  imports: [CommonFieldModule],
  animations: [...ErrorAnimations],
  template: `
    <mat-form-field
      style="width: 100%;"
      appearance="outline"
      [formGroup]="formGroup"
    >
      <mat-label>{{ label }}</mat-label>
      <input
        #input
        type="number"
        matInput
        [formControlName]="inputName"
        [attr.arai-required]="required"
        [attr.aria-min]="min"
        [attr.aria-max]="max"
        [data-testid]="inputName"
      />
      <mat-icon matIconPrefix *ngIf="prefixIcon">{{ prefixIcon }}</mat-icon>
      <mat-icon matIconSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
      <mat-error [@enter] [@leave]>
        {{ errors$ | async }}
      </mat-error>
    </mat-form-field>
  `,
})
export class NumberFieldComponent extends BaseFieldComponent {
  @Input() min = Number.MIN_SAFE_INTEGER;
  @Input() max = Number.MAX_SAFE_INTEGER;

  constructor(@Inject(FormGroup) formGroup: FormGroup) {
    super(formGroup);
  }
}
