import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { InputType } from '../../api';

@Component({
  selector: 'wt-common-input',
  imports: [CommonModule],
  templateUrl: './common-input.component.html',
  styleUrl: './common-input.component.scss',
  standalone: true,
})
export class CommonInputComponent {
  @Input() name?: string;
  @Input() formGroup?: FormGroup;
  @Input() inputType?: InputType;
}
