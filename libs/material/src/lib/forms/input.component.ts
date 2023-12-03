/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({ template: '' })
export class CommonInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() type = 'text';
  @Input() label = '';
  @Input() icon = 'info';
  @Input() minLength = 0;
  @Input() maxLength = Number.MAX_SAFE_INTEGER;
  @Input() min = Number.MIN_SAFE_INTEGER;
  @Input() max = Number.MAX_SAFE_INTEGER;
  @Input() required = false;

  getError() {
    const errors = this.formGroup.get(this.name)?.errors as any;

    if (errors) {
      if (errors.required) return `${this.name} is required`;
      if (errors.unique) return `${this.name} should be unique`;
      if (errors.email) return `${this.name} should be valid email`;
      if (errors.password) return `${this.name} should be strong password`;
      if (errors.phone) return `${this.name} should be strong phone`;

      if (errors.minLength)
        return `${this.name} should be longer than ${this.minLength - 1}`;
      if (errors.maxLength)
        return `${this.name} should be shorter than ${this.maxLength + 1}`;
      if (errors.min) return `${this.name} should be more than ${this.min - 1}`;
      if (errors.max) return `${this.name} should be less than ${this.max + 1}`;
    }
    return this.formGroup.get(this.name)?.errors?.['error'];
  }
}

@Component({
  selector: 'wt-input',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-form-field [formGroup]="formGroup" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [formControlName]="name"
        [required]="required"
        ]
      />
      <mat-icon matPrefix color="primary">{{ icon || 'info' }}</mat-icon>
      <mat-error>{{ getError() }}</mat-error>
    </mat-form-field>
  `,
})
export class InputComponent extends CommonInputComponent {}
