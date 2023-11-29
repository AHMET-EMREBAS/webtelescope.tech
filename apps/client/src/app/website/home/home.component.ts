import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'wt-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
