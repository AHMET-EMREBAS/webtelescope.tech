import { ValidatorFn, ValidatorFn as Vfn } from '@angular/forms';
import {
  isEAN,
  isEmail,
  isNotEmpty,
  isPhoneNumber,
  isStrongPassword,
} from 'class-validator';

export class InputValidator {
  private readonly validators: Vfn[] = [];
  constructor(private readonly name: string) {}

  private push(key: string, fn: ValidatorFn) {
    this.validators.push(fn);
  }

  required(): InputValidator {
    this.validators.push((c) =>
      isNotEmpty(c.value) ? null : { required: `${this.name} is required!` }
    );
    return this;
  }

  min(v: number): InputValidator {
    this.validators.push((control) =>
      parseFloat(control.value) >= v
        ? null
        : { min: `${this.name} must be greater than or equal to ${v}!` }
    );
    return this;
  }

  max(v: number): InputValidator {
    this.validators.push((control) =>
      parseFloat(control.value) <= v
        ? null
        : { max: `${this.name} must be less than or equal to ${v}!` }
    );
    return this;
  }

  minlength(v: number): InputValidator {
    this.validators.push((control) =>
      control.value.length >= v
        ? null
        : { minlength: `${this.name} must be longer than ${v - 1} characters!` }
    );

    return this;
  }

  maxlength(v: number): InputValidator {
    this.validators.push((control) =>
      control.value.length <= v
        ? null
        : {
            maxlength: `${this.name} must be shorter than ${v + 1} characters!`,
          }
    );
    return this;
  }

  password(): InputValidator {
    this.validators.push((c) =>
      isStrongPassword(c.value)
        ? null
        : { password: `${this.name} is not strong enough!` }
    );
    return this;
  }

  isEmail(): InputValidator {
    this.validators.push((c) =>
      isEmail(c.value) ? null : { email: `${this.name} must be a valid email!` }
    );
    return this;
  }

  isPhone(): InputValidator {
    this.validators.push((c) =>
      isPhoneNumber(c.value)
        ? null
        : { phone: `${this.name} must be a valid phone number!` }
    );
    return this;
  }

  isEan(): InputValidator {
    this.validators.push((c) =>
      isEAN(c.value)
        ? null
        : { ean: `${this.name} must be a valid ean number!` }
    );
    return this;
  }

  build() {
    return [...this.validators];
  }
}
