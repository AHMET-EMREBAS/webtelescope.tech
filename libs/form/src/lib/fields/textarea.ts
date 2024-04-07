import { Component } from '@angular/core';
import { CommonFieldModule } from './field';
import { TextFieldComponent } from './text';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-textarea',
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
      <textarea
        style="min-height: 100px; resize: none;"
        #input
        type="text"
        matInput
        [formControlName]="inputName"
        [formControlName]="inputName"
        [attr.aria-minlength]="minLength"
        [attr.aria-maxlength]="maxLength"
        [attr.aria-required]="required"
        [attr.data-testid]="inputName"
        autocomplete="off"
        [errorStateMatcher]="errorState"
      ></textarea>
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
    </mat-form-field>
  `,
})
export class TextareaFieldComponent extends TextFieldComponent {}
