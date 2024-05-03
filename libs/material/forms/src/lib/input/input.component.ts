import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SetAttributeDirective } from '../directives';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TempValue, names } from '@webpackages/utils';
import { LabelcasePipe } from '../pipes';
import {
  DefaultErrorStateMatcher,
  InputOption,
} from '@webpackages/client-common';

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

  @Input() options!: InputOption;
  @Input() formControl!: FormControl;

  typingChecker = new TempValue<boolean>(400, (value) => {
    console.log('Marking the input as peristine!');
  });

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
