import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextInputComponent } from '../../form/text-input/text-input.component';
import { PasswordValidator } from '../../api';

export type LoginData = {
  username: string;
  password: string;
};

const signupFormGroup = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [PasswordValidator]),
});

@Component({
  selector: 'wt-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TextInputComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  formGroup = signupFormGroup;

  /**
   * After login button is clicked, if the form is valid, then emit form value
   */
  @Output() signupEvent = new EventEmitter<LoginData>();

  submit() {
    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      if (username && password) {
        this.signupEvent.emit({ username, password });
      }
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
