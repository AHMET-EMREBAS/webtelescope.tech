import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent, FormInputComponent } from '@webpackages/components';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });
}
