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
} from '@angular/forms';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [CommonModule, InputDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [InputDirective],
})
export class FormComponent implements AfterViewInit {
  componentRef = InputComponent;
  @ContentChildren(InputComponent) inputs!: QueryList<InputComponent>;

  @Input() formSubmitLabel = 'Submit';

  @Output() formSubmit = new EventEmitter();

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
      this.formGroup.setControl(input.options.inputName, input.formControl);
    }

    this.formGroup.valueChanges.subscribe(console.log);
  }
}

@NgModule({
  imports: [CommonModule, FormComponent, InputDirective, InputComponent],
  exports: [FormComponent, InputDirective, InputComponent],
})
export class FormModule {}
