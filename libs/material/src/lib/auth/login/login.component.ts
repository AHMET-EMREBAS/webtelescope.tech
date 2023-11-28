import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../form/text-input/text-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type LoginData = {
  username: string;
  password: string;
};

const loginFormGroup = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]),
});

@Component({
  selector: 'wt-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TextInputComponent,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup = loginFormGroup;

  /**
   * After login button is clicked, if the form is valid, then emit form value
   */
  @Output() loginEvent = new EventEmitter<LoginData>();

  /**
   * After forgot-password button is clicked, if the username is valid, then emit username object
   */
  @Output() forgotPasswordEvent = new EventEmitter<
    Pick<LoginData, 'username'>
  >();

  submit() {
    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      if (username && password) {
        this.loginEvent.emit({ username, password });
      }
    }
  }

  reset() {
    this.formGroup.reset();
  }

  forgotPassword() {
    const usernameControl = this.formGroup.get('username');

    if (usernameControl?.valid && usernameControl.value) {
      const username = usernameControl.value;
      this.forgotPasswordEvent.emit({ username });
    } else {
      usernameControl?.setErrors({ error: `username is not a valid email!` });
    }
  }
}
