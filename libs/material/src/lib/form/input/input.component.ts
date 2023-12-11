/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

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
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  @Input() name!: string;
  @Input() type: HTMLInputElement['type'] = 'text';
  @Input() formGroup!: FormGroup;
  @Input() inputType!: InputType;

  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required?: boolean;
  @Input() label?: boolean;
  @Input() icon?: string;

  @Input() options?: SelectOption[];

  @Input() enums?: string[];

  @Input() autocomplete: HTMLInputElement['autocomplete'] = 'off';

  errorMessage$!: Observable<string | undefined>;

  ngOnInit(): void {
    this.errorMessage$ = this.formGroup!.valueChanges.pipe(
      map(() => {
        const control = this.formGroup!.get(this.name!);
        const errors = control?.errors as any;

        if (errors) {
          const {
            required,
            minLength,
            maxLength,
            min,
            max,
            email,
            unique,
            barcode,
          } = errors;

          if (required) return `${this.name} is required!`;
          if (minLength)
            return `${this.name} should contain at least ${this.minLength} characters!`;
          if (maxLength)
            return `${this.name} should contain at most ${this.maxLength} characters!`;
          if (min)
            return `${this.name} should contain at most ${this.min} characters!`;
          if (max)
            return `${this.name} should contain at most ${this.max} characters!`;
          if (unique) return `${this.name} should be unique!`;
          if (email) return `${this.name} should be valid email!`;
          if (barcode) return `${this.name} should be valid barcode!`;

          return undefined;
        }
      })
    );
  }
}
