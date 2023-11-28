import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormInputComponent } from '@webpackages/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'wt-home',
  standalone: true,
  imports: [CommonModule, FormComponent, FormInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  formGroup = new FormGroup({ 
    username: new FormControl(''),
    password: new FormControl('')
  })
}
