import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wt-common-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-form-field.component.html',
  styleUrl: './common-form-field.component.scss',
})
export class CommonFormFieldComponent {
  @Input() label = '';
  @Input() defaultValue = '';
  @Input() required = false;
  @Input() placeholder = '';
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() hints = '';

  minLength = 0;
  maxLength = 1000;
  min = Number.MIN_SAFE_INTEGER;
  max = Number.MAX_SAFE_INTEGER;
}
