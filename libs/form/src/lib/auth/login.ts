import { Component, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFieldComponent, TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';
import { ILoginDto } from '@webpackages/model';

export const LoginFormGroup = new FormGroup({
  username: new FormControl(
    '',
    new InputValidator('username').required().isEmail().build()
  ),
  password: new FormControl(
    '',
    new InputValidator('password').required().password().build()
  ),
});

@Component({
  imports: [FormComponent, TextFieldComponent, PasswordFieldComponent],
  standalone: true,
  selector: 'wt-login-form',
  template: `
    <wt-form
      [formTitle]="formTitle"
      [submitLabel]="submitLabel"
      (submitEvent)="submitForm()"
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
      useValue: LoginFormGroup,
    },
  ],
})
export class LoginFormComponent extends FormComponent<ILoginDto> {
  /**
   * @ignore
   */
  @ViewChild('username') username!: BaseFieldComponent;

  /**
   * @ignore
   */
  @ViewChild('password') password!: BaseFieldComponent;

  /**
   * @ignore
   */
  override formTitle: string = 'Login Form';
  /**
   * @ignore
   */
  override submitLabel: string = 'Login';

  /**
   * Focus the element
   */
  focusUserName() {
    this.username.focus();
  }
  /**
   * Focus the element
   */
  focusPassword() {
    this.password.focus();
  }
}
