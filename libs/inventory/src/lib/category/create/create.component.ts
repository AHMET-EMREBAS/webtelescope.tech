import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormComponent,
  InputComponent,
  SelectOption,
} from '@webpackages/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    status: new FormControl('', [Validators.required]),
  });

  statusOptions: SelectOption[] = [
    { id: 1, label: 'Todo' },
    { id: 2, label: 'Done' },
    { id: 3, label: 'In Progress' },
    { id: 4, label: 'Complete' },
  ];

  submit(event: any) {
    console.log('Saving Category: ', event);
  }
}
