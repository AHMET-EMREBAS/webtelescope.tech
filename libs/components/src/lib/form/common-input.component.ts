/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutoCompleteService } from './autocomplete/autocomplete.service';
import { Observable, debounceTime, of, switchMap } from 'rxjs';

@Component({ template: '' })
export class CommonInputComponent implements AfterViewInit {
  parseNumber$!: Observable<any>;

  /**
   * Upon form submit update the error message
   */
  @Input() errorMessage = 'Invalid input';

  /**
   * Input label
   */
  @Input() label = 'Input Label';

  /**
   * FormControlName
   */
  @Input() name = 'name';

  /**
   * Input icon
   */
  @Input() icon = 'info';

  @Input() iconColor = 'primary';

  /**
   * Explain the constraints of input value
   */
  @Input() hint = '';

  /**
   * Select Options
   */
  @Input() options: string[] = ['First', 'Second', 'Third'];

  @Input() multiple?:boolean;

  @Input() type: HTMLInputElement['type'] = 'text';
  @Input() autocomplete: HTMLInputElement['autocomplete'] = 'off';

  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required = false;

  @Input() autocompleteService?: AutoCompleteService;

  autocompleteOptions$?: Observable<{ id: number; name: string }[]>;

  @Input() public formGroup: FormGroup =
    inject<FormGroup>(FormGroup, { optional: true }) ||
    new FormGroup({ name: new FormControl('', []) });

  control() {
    return this.formGroup.get(this.name);
  }
  isInvalid() {
    return this.control()?.invalid && this.control()?.touched;
  }

  getError() {
    if (this.formGroup.valid) return;

    const errors = this.control()?.errors;
    if (errors) {
      const { required, minlength, maxlength, min, max, email } = errors;

      if (required) return `${this.name} is required!`;
      if (minlength)
        return `${this.name} should be longer than ${this.minLength}!`;
      if (maxlength)
        return `${this.name} should be longer than ${this.maxLength}!`;
      if (min) return `${this.name} should be more than ${this.min}!`;
      if (max) return `${this.name} should be more than ${this.max}!`;
      if (email) return `${this.name} should be email!`;

      const { _required, _minLength, _maxLength, _min, _max, _email, _unique } =
        errors;

      return (
        _required ||
        _minLength ||
        _maxLength ||
        _min ||
        _max ||
        _email ||
        _unique
      );
    }
  }

  getIconColor() {
    return this.control()?.invalid && this.control()?.touched
      ? 'red'
      : this.iconColor;
  }

  ngAfterViewInit(): void {
    if (this.type === 'number') {
      this.parseNumber$ = this.control()!.valueChanges.pipe(
        debounceTime(400),
        switchMap((value) => {
          this.control()?.setValue(parseFloat(value));
          return of(value);
        })
      );
    }
  }
}
