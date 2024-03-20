import { Component } from '@angular/core';
import { CommonFormFieldModule } from '../common-form-field/common-form-field.module';
import { CommonFormFieldComponent } from '../common-form-field/common-form-field.component';

@Component({
  selector: 'wt-form-field',
  standalone: true,
  imports: [CommonFormFieldModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent extends CommonFormFieldComponent {}
