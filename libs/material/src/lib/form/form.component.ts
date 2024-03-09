import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    AutocompleteInputComponent,
    DateInputComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup = inject(FormBuilder).group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    date: ['', Validators.required],
  });

  options = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Second' },
    { id: 4, name: 'Second' },
    { id: 5, name: 'Second' },
    { id: 6, name: 'Second' },
    { id: 7, name: 'Second' },
    { id: 8, name: 'Second' },
    { id: 9, name: 'Second' },
    { id: 10, name: 'Second' },
    { id: 11, name: 'Second' },
  ];
}
