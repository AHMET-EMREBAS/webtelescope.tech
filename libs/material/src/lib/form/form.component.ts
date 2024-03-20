import { Component } from '@angular/core';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormGroup } from '@angular/forms';
import {
  ErrorStateMacher2,
  provideErrorStateMatcher2,
} from './error-state-matcher';
import { FormCommonModule } from './common/common.module';
import { parseFormValue } from './parse-form-value';
import { TextareaComponent } from './textarea/textarea.component';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [FormCommonModule, FormFieldComponent , TextareaComponent],
  providers: [ErrorStateMacher2, provideErrorStateMatcher2()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(public readonly formGroup: FormGroup) {}

  submit(event: any) {
    Object.entries(this.formGroup.controls).forEach(([_, c]) => {
      c.markAsDirty();
      c.markAsTouched();
    });

    this.formGroup.enable();

    const parsedValue = parseFormValue(this.formGroup.value);

    console.log(parsedValue);
  }
}
