import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { names } from '@webpackages/utils';
import { AutoCompleteService } from './autocomplete/autocomplete.service';

@Component({ template: '' })
export class CommonInputComponent {
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

  @Input() multiple = false;

  @Input() type: HTMLInputElement['type'] = 'text';
  @Input() autocomplete: HTMLInputElement['autocomplete'] = 'off';

  @Input() minLength = 0;
  @Input() maxLength = 1000;
  @Input() min = -99999999999;
  @Input() max = 99999999999;
  @Input() required = false;

  @Input() autocompleteService?: AutoCompleteService;

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
    const errors = this.control()?.errors;

    if (errors) {
      const {
        required,
        minLength,
        maxLength,
        min,
        max,
        email,
        error,
        password,
      } = errors;

      const { readableName } = names(this.name);

      if (required) return `${readableName} is required!`;
      if (minLength)
        return `${readableName} must be shorter than ${minLength} characters!`;
      if (maxLength)
        return `${readableName} must be longer than ${maxLength} characters!`;
      if (min) return `${readableName} must be greater than ${min}!`;
      if (max) return `${readableName} must be less than ${max}!`;
      if (email) return `${readableName} must be a valid ${email}!`;

      if (password) return password;
      if (error) return error;
    }

    return undefined;
  }

  getIconColor() {
    return this.control()?.invalid && this.control()?.touched
      ? 'red'
      : this.iconColor;
  }
}
