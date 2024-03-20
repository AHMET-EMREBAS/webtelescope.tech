import { Component, Inject, ViewChild } from '@angular/core';
import { FormFieldComponent } from './form-field/form-field.component';
import {
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ErrorStateMacher2 } from './error-state-matcher';
import { CommonFormFieldModule } from './common-form-field/common-form-field.module';
import { provideFormGroup } from '../api';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [CommonFormFieldModule, FormFieldComponent],
  providers: [
    ErrorStateMacher2,
    // {
    //   provide: ErrorStateMatcher,
    //   useClass: SubmitedErrorStateMacher,
    // },
    provideFormGroup(
      new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        description: new FormControl('', []),
        age: new FormControl(0, []),
      })
    ),
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @ViewChild('form') form!: NgForm;
  /**
   *
   * @ignore @param formGroup
   */
  constructor(
    public readonly formGroup: FormGroup,
    public readonly esm: ErrorStateMacher2
  ) {}

  submit(event: any) {
    Object.entries(this.formGroup.controls).forEach(([_, c]) => {
      c.markAsDirty();
      c.markAsTouched();
    });

    this.formGroup.enable();
  }
}
