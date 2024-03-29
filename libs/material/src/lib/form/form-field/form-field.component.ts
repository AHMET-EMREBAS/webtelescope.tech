import { Component } from '@angular/core';
import { FormCommonModule } from '../common/common.module';
import { FieldComponent } from '../common/field.component';
import { FormGroup } from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'wt-form-field',
  standalone: true,
  imports: [FormCommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  animations: [
    bounceInOnEnterAnimation({ anchor: 'enter', duration: 600, delay: 600 }),
    bounceOutOnLeaveAnimation({ anchor: 'exit', duration: 200 }),
  ],
})
export class FormFieldComponent extends FieldComponent {
  constructor(formGroup: FormGroup) {
    super(formGroup);
  }
}
