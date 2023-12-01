import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() submitFormEvent = new EventEmitter();

  @Input() submitLabel = 'Submit';

  @Input() formGroup: FormGroup =
    inject(FormGroup, { optional: true }) ||
    new FormGroup({ name: new FormControl('') });

  submit() {
    if (this.formGroup.valid) {
      this.submitFormEvent.emit(this.formGroup.value);
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
