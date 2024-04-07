import { Component, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFieldComponent, TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';
import { ILoginWithCodeDto } from '@webpackages/model';

@Component({
  imports: [FormComponent, TextFieldComponent, PasswordFieldComponent],
  standalone: true,
  selector: 'wt-login-with-code-form',
  template: `
    <wt-form
      (submitButtonClick)="submit()"
      [formTitle]="formTitle"
      [submitLabel]="submitLabel"
      ]
    >
      <wt-text-field
        #username
        inputName="username"
        [required]="true"
        inputType="email"
        label="Username"
        prefixIcon="email"
      ></wt-text-field>
      <wt-text-field
        #securityCode
        inputName="securityCode"
        [required]="true"
        label="Security Code"
        prefixIcon="securityCode"
      ></wt-text-field>
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
        securityCode: new FormControl(
          '',
          new InputValidator('securityCode').required().build()
        ),
      }),
    },
  ],
})
export class LoginWithCodeFormComponent extends FormComponent<ILoginWithCodeDto> {
  @ViewChild('username') username!: BaseFieldComponent;
  @ViewChild('securityCode') securityCode!: BaseFieldComponent;

  override formTitle: string = 'Login With Security Code';
  override submitLabel: string = 'Login';

  focusUserName() {
    this.username.focus();
  }

  focusPassword() {
    this.securityCode.focus();
  }
}
