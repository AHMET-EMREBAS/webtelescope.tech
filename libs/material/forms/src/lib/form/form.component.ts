/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
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
import { TempValue } from '@webpackages/utils';
import { ErrorStateMatcher } from '@angular/material/core';
import { DefaultErrorStateMatcher } from '@webpackages/client-common';

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
  providers: [
    InputDirective,
    {
      provide: ErrorStateMatcher,
      useClass: DefaultErrorStateMatcher,
    },
  ],
})
export class FormComponent<T = any> implements AfterViewInit, OnInit {
  componentRef = InputComponent;

  @ContentChildren(InputComponent)
  componentReferances!: QueryList<InputComponent>;

  @Input() submitLabel = 'Submit';
  @Input() resetLabel = 'Reset';
  @Output() submitEvent = new EventEmitter();

  readonly formGroup = new FormGroup({});

  submitted = new TempValue<boolean>(3000);

  ready = false;

  ngOnInit(): void {
    console.log('Form Component Init');
  }
  /**
   * Check the required inputs
   */
  validateInputOptions() {
    console.log('Validating form input options ');
    for (const input of this.componentReferances) {
      if (!input.options.type)
        throw new Error('Input type is required from FormComponent. ');
      if (!input.options.name)
        throw new Error('Input name is required from FormComponent. ');
    }
  }

  ngAfterViewInit(): void {
    this.validateInputOptions();

    for (const input of this.componentReferances) {
      input.formControl = new FormControl('', []);

      const { required, minLength, maxLength, minimum, maximum } =
        input.options;

      if (required != undefined)
        input.formControl.addValidators(Validators.required);
      if (minLength != undefined)
        input.formControl.addValidators(Validators.minLength(minLength));
      if (maxLength != undefined)
        input.formControl.addValidators(Validators.maxLength(maxLength));
      if (minimum != undefined)
        input.formControl.addValidators(Validators.min(minimum));
      if (maximum != undefined)
        input.formControl.addValidators(Validators.max(maximum));

      console.log(`Creating ${input.options.name}`);
      if (!input.options.name)
        throw new Error('form control name is requried!');
      this.formGroup.setControl(input.options.name, input.formControl);
    }

    this.ready = true;
  }

  submitForm(formValue?: T) {
    this.submitted.next(true);
    this.submitEvent.emit(formValue ?? this.formGroup.value);
    this.resetForm();
  }

  resetForm() {
    this.formGroup.reset();
    this.formGroup.clearValidators();
    this.formGroup.clearAsyncValidators();
    this.formGroup.enable({ emitEvent: true });
  }
}

@NgModule({
  imports: [CommonModule, FormComponent, InputDirective, InputComponent],
  exports: [FormComponent, InputDirective, InputComponent],
})
export class FormModule {}
