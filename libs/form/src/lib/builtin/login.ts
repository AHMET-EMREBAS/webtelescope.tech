import { Component, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFieldComponent, TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';
import { ILoginDto } from '@webpackages/model';

@Component({
  imports: [FormComponent, TextFieldComponent, PasswordFieldComponent],
  standalone: true,
  selector: 'wt-login-form',
  template: `
    <wt-form
      (submitButtonClick)="submit()"
      [formTitle]="formTitle"
      [submitLabel]="submitLabel"
    >
      <wt-text-field
        #username
        inputName="username"
        [required]="true"
        inputType="email"
        label="Username"
        prefixIcon="email"
      ></wt-text-field>
      <wt-password-field
        #password
        inputName="password"
        [required]="true"
        label="Password"
        prefixIcon="password"
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
export class LoginFormComponent extends FormComponent<ILoginDto> {
  @ViewChild('username') username!: BaseFieldComponent;
  @ViewChild('password') password!: BaseFieldComponent;

  override formTitle: string = 'Login Form';

  override submitLabel: string = 'Login';
  focusUserName() {
    this.username.focus();
  }
  focusPassword() {
    this.password.focus();
  }
}
