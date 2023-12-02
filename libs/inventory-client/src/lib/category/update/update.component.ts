import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormInputComponent } from '@webpackages/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wt-update',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent {
  itemId = this.route.snapshot.paramMap.get('id');

  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

  constructor(private readonly route: ActivatedRoute) {}
}
