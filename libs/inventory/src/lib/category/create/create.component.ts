import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormComponent,
  InputComponent,
  SelectOptions,
} from '@webpackages/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [CommonModule, FormComponent, InputComponent],
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

  statusOptions: SelectOptions = ['Todo', 'InProgress', 'Complete'];

  constructor(private readonly service: CategoryService) {}

  submit(event: any) {
    this.service.saveItem(this.formGroup.value);
  }
}
