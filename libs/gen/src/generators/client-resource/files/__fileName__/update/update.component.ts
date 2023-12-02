/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'wt-update',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './update.component.html'
})
export class UpdateComponent {
  itemId = this.route.snapshot.paramMap.get('id');

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

  constructor(
    private readonly route: ActivatedRoute,
    public readonly categoryService: CategoryService
  ) {}
}
