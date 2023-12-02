/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../../product/component';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  formGroup = new FormGroup({
    sku: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
  });

  constructor(public readonly productService: ProductService) {}
}
