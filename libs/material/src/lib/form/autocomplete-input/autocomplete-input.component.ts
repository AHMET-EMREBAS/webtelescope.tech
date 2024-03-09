/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { CommonInputComponent } from '../common';
import { Observable, debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'wt-autocomplete-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss',
})
export class AutocompleteInputComponent
  extends CommonInputComponent
  implements OnInit
{
  @Input() options!: any[];
  @Input() visibleKey?: string;

  filteredOptions!: Observable<any[]>;
  formControl = new FormControl();

  ngOnInit() {
    this.filteredOptions = this.formGroup
      .get(this.inputName)!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        map((value) => {
          if (typeof value === 'string') {
            return this._filter(value);
          }
          return [];
        })
      );
  }

  displayFn() {
    return (value: any) => (this.visibleKey ? value[this.visibleKey] : value);
  }

  valueFn(value: any) {
    return this.visibleKey ? value[this.visibleKey] || '' : value;
  }

  private _filter(text: string): string[] {
    return this.options.filter((option) =>
      this.valueFn(option).toLowerCase().includes(text.toLowerCase())
    );
  }
}
