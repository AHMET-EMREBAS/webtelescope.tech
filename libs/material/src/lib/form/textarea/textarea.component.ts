import { Component } from '@angular/core';
import { FieldComponent, FormCommonModule } from '../common';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wt-textarea',
  standalone: true,
  imports: [FormCommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  animations: [
    bounceInOnEnterAnimation({ anchor: 'enter', duration: 600, delay: 600 }),
    bounceOutOnLeaveAnimation({ anchor: 'exit', duration: 200 }),
  ],
})
export class TextareaComponent extends FieldComponent {
  constructor(formGroup: FormGroup) {
    super(formGroup);
  }
}
