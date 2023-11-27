import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonInputComponent } from '../common-input.component';
import {
  AutoCompleteService,
  AutocompleteOption,
} from './autocomplete.service';
import { Observable, debounceTime, switchMap } from 'rxjs';


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
export class AutocompleteComponent extends CommonInputComponent {
  formControl = new FormControl('');

  autoCompleteOptions$: Observable<AutocompleteOption[]> | undefined =
    this.formControl.valueChanges.pipe(
      debounceTime(400),
      switchMap((search) => {
        return this.autoCompleteService.getWithQuery({ search: search || '' });
      })
    );

  constructor(
    @Optional()
    @Inject(FormGroup)
    formGroup: FormGroup,
    @Optional()
    @Inject(AutoCompleteService)
    public autoCompleteService: AutoCompleteService
  ) {
    super(formGroup);

    if (!autoCompleteService) {
      this.autoCompleteService = new AutoCompleteService();
    }
  }

  select(value: MatAutocompleteSelectedEvent) {
    this.formControl.setValue(value.option.value.name);
    this.control()?.setValue(value.option.value);
    console.log(value.option.value);
  }
}
