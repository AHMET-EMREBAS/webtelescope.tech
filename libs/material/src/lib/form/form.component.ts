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

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    AutocompleteInputComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup = inject(FormBuilder).group({
    name: ['', Validators.required],
    category: ['', Validators.required],
  });

  options = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
  ];
}
