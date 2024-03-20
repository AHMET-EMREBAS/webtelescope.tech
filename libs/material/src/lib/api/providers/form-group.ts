import { Provider } from '@angular/core';
import { FormGroup } from '@angular/forms';

export function provideFormGroup(formGroup: FormGroup): Provider {
  return {
    provide: FormGroup,
    useValue: formGroup,
  };
}
