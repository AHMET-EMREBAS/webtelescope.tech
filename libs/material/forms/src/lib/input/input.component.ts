import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SetAttributeDirective } from '../directives';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TempValue } from '@webpackages/utils';
import { LabelcasePipe } from '../pipes';
export interface InputOptions {
  type: string;
  inputName: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  icon?: string;
}
@Component({
  selector: 'wt-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    SetAttributeDirective,
    MatProgressSpinnerModule,
    LabelcasePipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  ref = InputComponent;
  @Input() options!: InputOptions;
  @Input() formControl!: FormControl;

  typingChecker = new TempValue(400);

  $isTyping = this.typingChecker.$value;

  errorMessage() {
    if (this.formControl?.errors?.['required']) {
      return `${this.options?.inputName} is required!`;
    } else if (this.formControl?.errors?.['minLength']) {
      return `${this.options?.inputName} should contain at least ${this.options?.minLength} characters!`;
    } else if (this.formControl?.errors?.['maxLength']) {
      return `${this.options?.inputName} should contain at most ${this.options?.maxLength} characters!`;
    }

    return 'Field is not valid!';
  }
}
