import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type AutocompleteOption = {
  id: number;
  name: string;
};

@Component({
  selector: 'wt-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input type="text" matInput [matAutocomplete]="auto" />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        @for (option of options; track option) {
        <mat-option [value]="option">{{ option }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class AutoCompleteComponent {
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() label!: string;
  @Input() options!: AutocompleteOption[];
}
