import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * 
 */
@Component({
  selector: 'wt-text',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-form-field class="on-focus" appearance="outline">
      <mat-label>Input Label</mat-label>
      <input
        matInput
        type="text"
        required="required"
        minlength="3"
        maxlength="30"
        autocomplete="off"
      />
      <mat-icon matPrefix>info</mat-icon>
    </mat-form-field>
  `,
})
export class TextComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this);
  }
}
