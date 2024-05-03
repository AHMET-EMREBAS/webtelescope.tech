import { Component } from '@angular/core';
import { CategoryService } from './service';

import { BasicFormComponent } from '@webpackages/material/forms';
import { ICategory, ICreateCategoryDto } from '@webpackages/gen-model';
import { BaseFormComponent } from '@webpackages/client-common';

@Component({
  selector: 'wt-category-form',
  imports: [BasicFormComponent],
  template: `<wt-basic-form
    submitLabel="Create Category"
    resetLabel="Clear Form"
    [inputs]="[
      {
        type: 'text',
        inputName: 'name',
        required: true,
        minLength: 3,
        maxLength: 30
      }
    ]"
    (submitEvent)="submitForm($event)"
  ></wt-basic-form>`,
  standalone: true,
})
export class CategoryComponent extends BaseFormComponent<ICategory> {
  constructor(service: CategoryService) {
    super(service);
  }

  submitForm(formValue: ICreateCategoryDto) {
    console.log('Creating category ... ', formValue);
    this.service.add({ id: 1, ...formValue });
  }
}
