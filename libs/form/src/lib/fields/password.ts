import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-password-field',
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
        [type]="inputType"
        matInput
        [formControlName]="inputName"
        [attr.aria-required]="required"
        [attr.data-testid]="inputName"
        autocomplete="off"
        [errorStateMatcher]="errorState"
      />
      <mat-icon [color]="iconColor$ | async" class="fill" matIconPrefix>
        password
      </mat-icon>

      <mat-error [@enter] [@leave]>{{ errors$ | async }}</mat-error>

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

      <button
        mat-icon-button
        matSuffix
        color="primary"
        (click)="toggleVisible()"
      >
        <mat-icon>{{ visible ? 'visibility_off' : 'visibility' }}</mat-icon>
      </button>
    </mat-form-field>
  `,
  animations: [...ErrorAnimations],
})
export class PasswordFieldComponent extends BaseFieldComponent {
  /**
   * @ignore
   */
  visible = false;

  override inputType = 'password';

  constructor(@Inject(FormGroup) formGroup: FormGroup) {
    super(formGroup);
  }

  toggleVisible() {
    this.visible = !this.visible;
    if (this.visible) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
}
