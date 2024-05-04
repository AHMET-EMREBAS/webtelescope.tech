import { Component } from '@angular/core';
import { CategoryService } from './ngrx.service';
import { BasicFormComponent } from '@webpackages/material/forms';
import { ICategory } from '@webpackages/gen-model';
import { BaseFormComponent } from '@webpackages/client-common';
import { categoryModelManager } from './model-manager';

@Component({
  selector: 'wt-category-form',
  imports: [BasicFormComponent],
  template: `<wt-basic-form
    submitLabel="Create Category"
    resetLabel="Clear Form"
    [inputs]="categoryModelManager."
    (submitEvent)="submitForm($event)"
  ></wt-basic-form>`,
  standalone: true,
})
export class CategoryFormComponent extends BaseFormComponent<ICategory> {
  constructor(service: CategoryService) {
    super(service);
  }

  submitForm(formValue: ICategory) {
    this.service.createEntity({ ...formValue });
  }
}
