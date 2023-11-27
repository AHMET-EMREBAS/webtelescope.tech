import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonInputComponent } from '../common-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'wt-switch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent extends CommonInputComponent {}
