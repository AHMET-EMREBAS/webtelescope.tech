import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputOptions } from '../input/input.component';
import { FormComponent, FormModule } from '../form';

@Component({
  selector: 'wt-basic-form',
  standalone: true,
  imports: [CommonModule, FormModule],
  templateUrl: './basic-form.component.html',
  styleUrl: './basic-form.component.scss',
})
export class BasicFormComponent extends FormComponent {
  @Input() inputs!: InputOptions[];
}
