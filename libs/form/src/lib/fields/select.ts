import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatSelectModule } from '@angular/material/select';
import { IOption } from '@webpackages/model';
import { FormGroup } from '@angular/forms';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-select-field',
  imports: [CommonFieldModule, MatSelectModule],
  standalone: true,
  template: ` <mat-form-field
    style="width: 100%;"
    appearance="outline"
    [formGroup]="formGroup"
  >
    <mat-label>{{ label }}</mat-label>
    <mat-select
      #input
      [formControlName]="inputName"
      [multiple]="multiple"
      [attr.data-testid]="inputName"
    >
      @for (option of options; track options) {
      <mat-option [value]="option" [attr.data-testid]="option.label">{{
        option.label
      }}</mat-option>
      }
    </mat-select>
    <mat-icon color="primary" class="fill" matIconPrefix *ngIf="prefixIcon">
      {{ prefixIcon }}
    </mat-icon>
    <mat-icon color="primary" class="fill" matIconSuffix *ngIf="suffixIcon">
      {{ suffixIcon }}
    </mat-icon>
    <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
    <mat-error [@enter] [@leave]>
      {{ errors$ | async }}
    </mat-error>
  </mat-form-field>`,
  animations: [...ErrorAnimations],
})
export class SelectFieldComponent extends BaseFieldComponent {
  /**
   * Select options
   */
  @Input() options!: IOption[];

  /**
   * Multiple select
   */
  @Input() multiple: boolean = false;

  constructor(formGroup: FormGroup) {
    super(formGroup);
    setTimeout(() => {
      this.formGroup.get(this.inputName)?.valueChanges.subscribe(console.log);
    }, 2000);
  }
}
