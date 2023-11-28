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

export type ResetPasswordWithCodeData = {
  username: string;
  securityCode: string;
  newPassword: string;
  confirmPassword: string;
};

export const resetPasswordWithCode = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.email]),
  securityCode: new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]),
  newPassword: new FormControl('', [PasswordValidator]),
  confirmPassword: new FormControl('', [PasswordValidator]),
});

@Component({
  selector: 'wt-reset-password-with-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TextInputComponent,
  ],
  templateUrl: './reset-password-with-code.component.html',
  styleUrl: './reset-password-with-code.component.scss',
})
export class ResetPasswordWithCodeComponent {
  formGroup = resetPasswordWithCode;

  @Output() resetPasswordWithCodeEvent =
    new EventEmitter<ResetPasswordWithCodeData>();

  submit() {
    if (this.formGroup.valid) {
      const { username, securityCode, confirmPassword, newPassword } =
        this.formGroup.value;
      if (username && securityCode && confirmPassword && newPassword) {
        this.resetPasswordWithCodeEvent.emit({
          username,
          securityCode,
          newPassword,
          confirmPassword,
        });
      }
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
