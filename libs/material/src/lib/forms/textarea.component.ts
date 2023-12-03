import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'wt-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-form-field [formGroup]="formGroup" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <textarea matInput [formControlName]="name"></textarea>
    </mat-form-field>
  `,
})
export class TextareaComponent {
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() label = '';
}
