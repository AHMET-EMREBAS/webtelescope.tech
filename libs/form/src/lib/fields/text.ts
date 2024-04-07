import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-text-field',
  standalone: true,
  imports: [CommonFieldModule],
  template: `
    <mat-form-field
      style="width: 100%;"
      appearance="outline"
      [formGroup]="formGroup"
    >
      <mat-label>{{ label }}</mat-label>
      <input
        #input
        matInput
        [type]="inputType"
        [formControlName]="inputName"
        [attr.aria-minlength]="minLength"
        [attr.aria-maxlength]="maxLength"
        [attr.aria-required]="required"
        [data-testid]="inputName"
        autocomplete="off"
      />
      <mat-icon color="primary" class="fill" matIconPrefix *ngIf="prefixIcon">{{
        prefixIcon
      }}</mat-icon>
      <mat-icon color="primary" class="fill" matIconSuffix *ngIf="suffixIcon">{{
        suffixIcon
      }}</mat-icon>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
      <mat-error [@enter] [@leave]>
        {{ errors$ | async }}
      </mat-error>
    </mat-form-field>
  `,
  animations: [...ErrorAnimations],
})
export class TextFieldComponent extends BaseFieldComponent {
  /**
   * Mimimum text length
   */
  @Input() minLength = 0;
  /**
   * Maximum text length
   */
  @Input() maxLength = 400;

  constructor(@Inject(FormGroup) formGroup: FormGroup) {
    super(formGroup);
  }
}
