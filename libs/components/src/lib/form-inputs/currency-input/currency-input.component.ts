import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../form/text-input/text-input.component';

@Component({
  selector: 'wt-currency-input',
  standalone: true,
  imports: [CommonModule, TextInputComponent],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
})
export class CurrencyInputComponent {}
