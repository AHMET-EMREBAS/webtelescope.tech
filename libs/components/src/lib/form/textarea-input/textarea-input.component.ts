import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonInputComponent } from '../common-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'wt-textarea-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss',
})
export class TextareaInputComponent extends CommonInputComponent {}
