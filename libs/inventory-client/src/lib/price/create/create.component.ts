/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { CategoryService } from '../../category/category.service';
import { SkuService } from '../../sku/component';
import { PriceLevelService } from '../../price-level/component';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  formGroup = new FormGroup({
    price: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
    priceLevel: new FormControl('', [Validators.required]),
  });

  constructor(
    public readonly skuService: SkuService,
    public readonly priceLevelService: PriceLevelService
  ) {}
}
