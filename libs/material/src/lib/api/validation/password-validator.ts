import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UpperCaseRx = /[A-Z]{1,}/;
export const LowerCaseRx = /[a-z]{1,}/;
export const NumberRx = /[0-9]{1,}/;
export const SpecialCharRx = /[~!@#$%^&*()_+{}:"<>?\[\];',\.\/]{1,}/;

export function PasswordValidator(propertyName: string): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value) {
      if (!UpperCaseRx.test(value))
        return {
          password: `${propertyName} should contain at least 1 uppercase value!`,
        };
      if (!LowerCaseRx.test(value))
        return {
          password: `${propertyName} should contain at least 1 lowercase value!`,
        };
      if (!NumberRx.test(value))
        return {
          password: `${propertyName} should contain at least 1 number!`,
        };
      if (!SpecialCharRx.test(value))
        return {
          password: `${propertyName} should contain at least 1 special character!`,
        };
      if (value.includes(' ')) {
        return {
          password: `${propertyName} should not contain space!`,
        };
      }
    }
    return null;
  };
}
