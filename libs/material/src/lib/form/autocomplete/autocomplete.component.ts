import { Component, Input, OnInit, inject } from '@angular/core';
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
export class AutocompleteComponent
  extends CommonInputComponent
  implements OnInit
{
  formControl = new FormControl('');

  @Input() autoCompleteService: AutoCompleteService =
    inject<AutoCompleteService>(AutoCompleteService, { optional: true }) ||
    new AutoCompleteService();

  autoCompleteOptions$: Observable<AutocompleteOption[]> | undefined =
    this.formControl.valueChanges.pipe(
      debounceTime(400),
      switchMap((search) => {
        return this.autoCompleteService.getWithQuery({ search: search || '' });
      })
    );

  constructor() {
    super();
  }
  select(value: MatAutocompleteSelectedEvent) {
    this.formControl.setValue(value.option.value.name);
    this.control()?.setValue(value.option.value);
    console.log(value.option.value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formControl.setValue('');
    }, 2000);
  }
}
