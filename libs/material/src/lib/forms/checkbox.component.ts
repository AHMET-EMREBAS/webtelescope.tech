import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'wt-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <div [formGroup]="formGroup">
      <mat-checkbox [formControlName]="name">{{ label }}</mat-checkbox>
    </div>
  `,
})
export class CheckboxComponent {
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() label!: string;
}
