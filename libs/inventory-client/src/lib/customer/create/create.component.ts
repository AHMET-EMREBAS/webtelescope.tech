/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { CategoryService } from '../../category/category.service';
import { PriceLevelService } from '../../price-level/component';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
  });

  constructor(public readonly priceLevelService: PriceLevelService) {}
}
