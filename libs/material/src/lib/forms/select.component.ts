import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'wt-select',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field [formGroup]="formGroup" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <mat-select [formControlName]="name" [multiple]="multiple" ]>
        @for (option of options; track option) {
        <mat-option [value]="option">{{ option }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectComponent {
  @Input() name!: string;
  @Input() label = '';
  @Input() formGroup!: FormGroup;
  @Input() options: string[] = [];
  @Input() multiple = false;
}
