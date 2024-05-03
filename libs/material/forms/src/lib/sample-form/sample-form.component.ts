import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from '../form';

@Component({
  selector: 'wt-sample-form',
  standalone: true,
  imports: [CommonModule, FormModule],
  templateUrl: './sample-form.component.html',
  styleUrl: './sample-form.component.scss',
})
export class SampleFormComponent {}
