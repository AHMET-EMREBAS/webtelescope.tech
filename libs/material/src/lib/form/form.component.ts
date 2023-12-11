/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter();
  @Input() defaultValue?: Record<string, any>;

  ngOnInit(): void {
    if (this.defaultValue) {
      const entries = Object.entries(this.defaultValue);
      for (const [key, value] of entries) {
        this.formGroup.get(key)?.setValue(value);
      }
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.dirty && this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value);
    }
  }
}
