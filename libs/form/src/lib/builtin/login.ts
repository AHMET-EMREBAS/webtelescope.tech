import { Component } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';

@Component({
  imports: [FormComponent, TextFieldComponent, PasswordFieldComponent],
  standalone: true,
  selector: 'wt-login-form',
  template: `
    <wt-form>
      <wt-text-field
        inputName="username"
        [required]="true"
        inputType="email"
        label="Username"
      ></wt-text-field>
      <wt-password-field
        inputName="password"
        [required]="true"
        label="Password"
      ></wt-password-field>
    </wt-form>
  `,
  providers: [
    {
      provide: FormGroup,
      useValue: new FormGroup({
        username: new FormControl(
          '',
          new InputValidator('username').required().isEmail().build()
        ),
        password: new FormControl(
          '',
          new InputValidator('password').required().password().build()
        ),
      }),
    },
  ],
})
export class LoginFormComponent {}
