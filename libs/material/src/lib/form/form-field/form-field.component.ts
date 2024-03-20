import { Component } from '@angular/core';
import { CommonFormFieldModule } from '../common-form-field/common-form-field.module';
import { CommonFormFieldComponent } from '../common-form-field/common-form-field.component';
import { FormGroup } from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'wt-form-field',
  standalone: true,
  imports: [CommonFormFieldModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  animations: [
    bounceInOnEnterAnimation({ anchor: 'enter', duration: 600, delay: 600 }),
    bounceOutOnLeaveAnimation({ anchor: 'exit', duration: 200 }),
  ],
})
export class FormFieldComponent extends CommonFormFieldComponent {
  constructor(formGroup: FormGroup) {
    super(formGroup);
  }
}
