import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgModule,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from '../directives';
import { InputComponent } from '../input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    InputDirective,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [InputDirective],
})
export class FormComponent implements AfterViewInit {
  componentRef = InputComponent;

  @ContentChildren(InputComponent) inputs!: QueryList<InputComponent>;

  @Input() submitLabel = 'Submit';
  @Input() resetLabel = 'Reset';
  @Output() submitEvent = new EventEmitter();

  readonly formGroup = new FormGroup({});

  /**
   * Check the required inputs
   */
  validateInputOptions() {
    for (const input of this.inputs) {
      if (!input.options.inputName)
        throw new Error('Input name is required from FormComponent. ');
      if (!input.options.label)
        throw new Error('Input label is required from FormComponent. ');
    }
  }

  ngAfterViewInit(): void {
    this.validateInputOptions();
    for (const input of this.inputs) {
      input.formControl = new FormControl('', []);

      const { required, minLength, maxLength, min, max } = input.options;

      if (required != undefined)
        input.formControl.addValidators(Validators.required);

      if (required != undefined)
        input.formControl.addValidators(Validators.required);

      if (minLength != undefined)
        input.formControl.addValidators(Validators.minLength(minLength));
      if (maxLength != undefined)
        input.formControl.addValidators(Validators.maxLength(maxLength));
      if (min != undefined)
        input.formControl.addValidators(Validators.min(min));
      if (max != undefined)
        input.formControl.addValidators(Validators.max(max));

      this.formGroup.setControl(input.options.inputName, input.formControl);
    }

    this.formGroup.valueChanges.subscribe(console.log);
  }

  submitForm() {
    this.submitEvent.emit(this.formGroup.value);
  }
  resetForm() {
    this.formGroup.reset();
  }
}

@NgModule({
  imports: [CommonModule, FormComponent, InputDirective, InputComponent],
  exports: [FormComponent, InputDirective, InputComponent],
})
export class FormModule {}
