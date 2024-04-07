import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IOption } from '@webpackages/model';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { ErrorAnimations } from './error-animations';

@Component({
  selector: 'wt-autocomplete-field',
  imports: [CommonFieldModule, MatAutocompleteModule],
  standalone: true,
  template: ` <mat-form-field
    style="width: 100%;"
    appearance="outline"
    [formGroup]="formGroup"
  >
    <mat-label>{{ label }}</mat-label>
    <input
      #input
      type="text"
      placeholder="Pick one"
      aria-label="Number"
      matInput
      [formControl]="formControl"
      [matAutocomplete]="auto"
      [attr.data-testid]="inputName"
      [errorStateMatcher]="errorState"
    />

    <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
      @for (option of filteredOptions$ | async; track option) {
      <mat-option
        [value]="option.label"
        (onSelectionChange)="setValue(option)"
        [attr.data-testid]="option.label"
      >
        {{ option.label }}
      </mat-option>
      }
    </mat-autocomplete>

    <mat-icon color="primary" class="fill" matIconPrefix *ngIf="prefixIcon">
      {{ prefixIcon }}
    </mat-icon>

    <mat-icon color="primary" class="fill" matIconSuffix *ngIf="suffixIcon">
      {{ suffixIcon }}
    </mat-icon>
    <mat-hint *ngIf="hint">{{ hint }}</mat-hint>

    <mat-error [@enter] [@leave]>
      {{ errors$ | async }}
    </mat-error>
  </mat-form-field>`,
  animations: [...ErrorAnimations],
})
export class AutocompleteFieldComponent extends BaseFieldComponent {
  formControl = new FormControl();

  /**
   * Select options
   */
  @Input() options!: IOption[];

  filteredOptions$: Observable<IOption[]> = this.formControl.valueChanges.pipe(
    debounceTime(400),
    startWith(''),

    map((value) => {
      return this.options
        .filter((e) => {
          return e.label.toLowerCase().includes(value.toLowerCase());
        })
        .slice(0, 5);
    })
  );
  /**
   * Multiple select
   */
  @Input() multiple: boolean = false;

  setValue(event: IOption) {
    this.formGroup.get(this.inputName)?.setValue(event);
  }
}
