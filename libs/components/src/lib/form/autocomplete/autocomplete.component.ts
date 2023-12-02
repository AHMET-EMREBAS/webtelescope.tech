import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonInputComponent } from '../common-input.component';
import { Observable, debounceTime, map } from 'rxjs';

/**
 * Autocomplete Component requires AutocompleteServices from which the component searches for inputs based on the user input.
 */
@Component({
  selector: 'wt-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent
  extends CommonInputComponent
  implements OnInit
{
  formControl = new FormControl('');
  autoCompleteOptions$?: Observable<any[]>;

  select(value: MatAutocompleteSelectedEvent) {
    this.formControl.setValue(value.option.value[this.propertyName]);
    this.control()?.setValue(value.option.value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formControl.setValue('');
    }, 2000);
    this.autoCompleteOptions$ = this.autocompleteService?.entities$;

    this.formControl.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      this.autocompleteService?.search(value!);
    });
  }
}
