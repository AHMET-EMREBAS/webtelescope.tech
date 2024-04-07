import { Component, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFieldComponent, TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';
import { ICreateSubDto, IID } from '@webpackages/model';

@Component({
  imports: [FormComponent, TextFieldComponent, PasswordFieldComponent],
  standalone: true,
  selector: 'wt-login-form',
  template: `
    <wt-form (submitButtonClick)="submit()" [label]="label">
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

      <wt-text-field
        #organizationName
        inputName="organizationName"
        [required]="true"
        inputType="text"
        label="Organization Name"
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
        password: new FormControl(
          '',
          new InputValidator('password').required().password().build()
        ),
        organizationName: new FormControl(
          '',
          new InputValidator('organization name')
            .required()
            .minlength(3)
            .maxlength(30)
            .build()
        ),
        subType: new FormControl(
          '',
          new InputValidator('subscription type')
            .required()
            .minlength(3)
            .maxlength(30)
            .build()
        ),
      }),
    },
  ],
})
export class SubFormComponent extends FormComponent<ICreateSubDto<IID>> {
  @ViewChild('username') username!: BaseFieldComponent;
  @ViewChild('password') password!: BaseFieldComponent;
  @ViewChild('organizationName') organizationName!: BaseFieldComponent;
  @ViewChild('subType') subType!: BaseFieldComponent;

  override label: string = 'Login';

  focusUserName() {
    this.username.focus();
  }

  focusPassword() {
    this.password.focus();
  }

  focusOrganizationName() {
    this.organizationName.focus();
  }

  focusSubType() {
    this.subType.focus();
  }
}
