import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ template: '' })
export abstract class CommonInputComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;

  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() label?: string;
  @Input() required?: boolean;
}
