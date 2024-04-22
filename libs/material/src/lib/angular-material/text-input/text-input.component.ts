import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../../common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface TextInput {
  id?: number;
  inputName?: string;
  label?: string;
  placeholder?: string;
  prefixIcon?: Icon;
  suffixIcon?: Icon;
  requried?: boolean;
  minLength?: number;
  maxLength?: number;
  autocomplete?: HTMLInputElement['autocomplete'];
  appearance: MatFormFieldAppearance;
}

@Component({
  selector: 'wt-text-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {}
