import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'wt-sample-form',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './sample-form.component.html',
  styleUrl: './sample-form.component.scss',
})
export class SampleFormComponent {
  formGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });

  categories = ['Cat 1', 'Cat 2'];
}
