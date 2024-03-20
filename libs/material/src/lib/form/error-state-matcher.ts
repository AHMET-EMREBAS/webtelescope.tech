/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Provider } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {} from '@angular/material/form-field';

@Injectable()
export class ErrorStateMacher2 extends ErrorStateMatcher {
  override isErrorState(control: AbstractControl<any, any> | null): boolean {
    if (control)
      if (control.touched && control.dirty) {
        if (control.invalid) {
          return true;
        }
        return false;
      }
    return false;
  }
}

export function provideSubmittedErrorStateMatcher(): Provider {
  return {
    provide: ErrorStateMatcher,
    useClass: ErrorStateMacher2,
  };
}
