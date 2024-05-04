import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormModule } from '../form';
import { InputOptions } from '@webpackages/meta';

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
