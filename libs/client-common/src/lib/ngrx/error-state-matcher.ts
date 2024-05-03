/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl } from '@angular/forms';

export class DefaultErrorStateMatcher extends ErrorStateMatcher {
  override isErrorState(control: AbstractControl<any, any> | null): boolean {
    if (control && !control.pristine) {
      console.log('Setting the error state....');
      return control?.dirty && control.invalid;
    }
    return false;
  }
}
