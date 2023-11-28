import { AbstractControl, ValidatorFn } from '@angular/forms';

export const PasswordValidator: ValidatorFn = (control: AbstractControl) => {
  const upperCase = /[A-Z]{1,}/;
  const lowerCase = /[a-z]{1,}/;
  const number = /[0-9]{1,}/;
  const specials = /[~!@#$%^&*()_+{}:"<>?\\[\]\\;',\\.\\/]{1,}/;
  const value = control.value;
  if (value) {
    if (!upperCase.test(value))
      return { password: 'Field must contact at least one upper-case value ' };
    if (!lowerCase.test(value))
      return { password: 'Field must contact at least one lower-case value ' };
    if (!number.test(value))
      return { password: 'Field must contact at least one number value ' };
    if (!specials.test(value))
      return {
        password: 'Field must contact at least one special character value ',
      };
  }

  return null;
};
