import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SetAttributeDirective } from '../directives';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TempValue, names } from '@webpackages/utils';
import { LabelcasePipe } from '../pipes';
import { ErrorStateMatcher } from '@angular/material/core';
import { InputOption } from '@webpackages/client-common';
export class DefaultErrorStateMatcher extends ErrorStateMatcher {
  override isErrorState(control: AbstractControl<any, any> | null): boolean {
    if (control) {
      return control?.dirty && control.invalid;
    }
    return false;
  }
}

// export interface InputOptions {
//   type: string;
//   inputName: string;
//   label?: string;
//   required?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   min?: number;
//   max?: number;
//   icon?: string;
// }
@Component({
  selector: 'wt-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    SetAttributeDirective,
    MatProgressSpinnerModule,
    LabelcasePipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  ref = InputComponent;
  errorStateMatcher = new DefaultErrorStateMatcher();
  @Input() options!: InputOption;
  @Input() formControl!: FormControl;

  typingChecker = new TempValue<boolean>(400);

  $isTyping = this.typingChecker.$value;

  errorMessage() {
    const inputName = names(this.options.inputName).titleName;

    if (this.formControl?.errors?.['required']) {
      return `${inputName} is required!`;
    } else if (this.formControl?.errors?.['minLength']) {
      return `${inputName} should contain at least ${this.options?.minLength} characters!`;
    } else if (this.formControl?.errors?.['maxLength']) {
      return `${inputName} should contain at most ${this.options?.maxLength} characters!`;
    } else {
      return null;
    }
  }
}
