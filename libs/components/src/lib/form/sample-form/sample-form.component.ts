/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { States } from '../../api';

@Component({
  selector: 'wt-sample-form',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './sample-form.component.html',
  styleUrl: './sample-form.component.scss',
})
export class SampleFormComponent {
  /**
   * Form submit event
   */
  @Output() formSubmit = new EventEmitter();

  formGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
  });

  cities = ['Houston', 'Austin', 'Dallas'];
  states = States;

  submit(event: any) {
    this.formSubmit.emit(event);
  }
}
