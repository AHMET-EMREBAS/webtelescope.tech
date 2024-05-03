import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() submitEvent = new EventEmitter();

  formGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    autocomplete: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.submitEvent.emit(this.formGroup.value);
  }
}
