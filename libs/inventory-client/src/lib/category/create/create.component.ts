import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ResourceService, TextInputComponent } from '@webpackages/components';
import { CategoryService } from '../category.service';

@Component({
  selector: 'wt-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,

    TextInputComponent,
  ],

  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private readonly service: CategoryService) {}

  save() {
    const { name } = this.formGroup.value;

    console.log(this.formGroup.value);

    this.service.saveItem({ name: name! });
  }
}
