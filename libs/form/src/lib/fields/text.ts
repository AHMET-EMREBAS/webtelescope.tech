import { Component, Input } from '@angular/core';
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
        [attr.data-testid]="inputName"
        autocomplete="off"
        [errorStateMatcher]="errorState"
      />
      <mat-icon
        [color]="iconColor$ | async"
        class="fill"
        matIconPrefix
        *ngIf="prefixIcon"
      >
        {{ prefixIcon }}
      </mat-icon>
      <mat-icon
        [color]="iconColor$ | async"
        class="fill"
        matIconSuffix
        *ngIf="suffixIcon"
      >
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
}
