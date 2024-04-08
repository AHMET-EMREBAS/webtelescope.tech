import { Component, Input, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BaseFieldComponent,
  ListSelectComponent,
  TextFieldComponent,
} from '../fields';
import { ICreateUserDto, IID, IOption } from '@webpackages/model';

@Component({
  imports: [FormComponent, TextFieldComponent, ListSelectComponent],
  standalone: true,
  selector: 'wt-login-form',
  template: `
    <wt-form
      (submitButtonClick)="submit()"
      [submitLabel]="submitLabel"
      [formTitle]="formTitle"
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

      <wt-password-field
        #password
        inputName="password"
        [required]="true"
        prefixIcon="password"
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
        roles: new FormControl('', new InputValidator('Roles').build()),
      }),
    },
  ],
})
export class UserFormComponent extends FormComponent<ICreateUserDto<IID, IID>> {
  @ViewChild('username') username!: BaseFieldComponent;
  @ViewChild('password') password!: BaseFieldComponent;

  @ViewChild('subType') subType!: BaseFieldComponent;

  override formTitle: string = 'Sign Up Form';

  override submitLabel: string = 'Sign Up';

  /**
   * Subscription type options
   */
  @Input() subTypes!: IOption[];

  focusUserName() {
    this.username.focus();
  }

  focusPassword() {
    this.password.focus();
  }
}
