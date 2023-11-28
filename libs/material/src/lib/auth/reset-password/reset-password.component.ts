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

export type ResetPasswordData = {
  username: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export const resetPasswordForm = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl(''),
  newPassword: new FormControl('', [PasswordValidator]),
  confirmPassword: new FormControl('', [PasswordValidator]),
});

@Component({
  selector: 'wt-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TextInputComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  formGroup = resetPasswordForm;

  /**
   * After login button is clicked, if the form is valid, then emit form value
   */
  @Output() resetPasswordEvent = new EventEmitter<ResetPasswordData>();

  submit() {
    if (this.formGroup.valid) {
      const { username, password, confirmPassword, newPassword } =
        this.formGroup.value;
      if (username && password && confirmPassword && newPassword) {
        this.resetPasswordEvent.emit({
          username,
          password,
          confirmPassword,
          newPassword,
        });
      }
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
