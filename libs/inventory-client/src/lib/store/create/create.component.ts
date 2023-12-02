/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    categories: new FormControl('', [Validators.required]),
  });

  constructor(public readonly categoryService: CategoryService) {}
}
