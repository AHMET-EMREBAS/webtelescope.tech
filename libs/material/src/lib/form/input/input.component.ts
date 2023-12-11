/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export type InputType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'switch'
  | 'select'
  | 'autocomplete'
  | 'radio'
  | 'enums';

export type SelectOption = {
  id: number;
  label: string;
};

@Component({
  selector: 'wt-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() appearance: MatFormFieldAppearance = 'outline';

  @Input() name!: string;
  @Input() type: HTMLInputElement['type'] = 'text';
  @Input() formGroup!: FormGroup;
  @Input() inputType!: InputType;

  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required?: boolean;
  @Input() label?: string;
  @Input() icon = 'info';

  @Input() options?: SelectOption[];
  @Input() enums?: string[];
  @Input() autocomplete: HTMLInputElement['autocomplete'] = 'off';

  errorMessage$!: Observable<string | undefined>;

  getError() {
    const errors = this.formGroup.get(this.name)?.errors;

    if (errors) {
      const {
        required,
        minlength,
        maxlength,
        min,
        max,
        email,
        unique,
        barcode,
      } = errors;

      if (required) return `${this.name} is required!`;
      if (minlength)
        return `${this.name} should contain at least ${this.minlength} characters!`;
      if (maxlength)
        return `${this.name} should contain at most ${this.maxlength} characters!`;
      if (min)
        return `${this.name} should contain at most ${this.min} characters!`;
      if (max)
        return `${this.name} should contain at most ${this.max} characters!`;
      if (unique) return `${this.name} should be unique!`;
      if (email) return `${this.name} should be valid email!`;
      if (barcode) return `${this.name} should be valid barcode!`;

      return undefined;
    }

    return undefined;
  }
}
