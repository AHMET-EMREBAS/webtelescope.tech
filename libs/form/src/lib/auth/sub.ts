import { Component, Input, ViewChild } from '@angular/core';
import { FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFieldComponent, TextFieldComponent } from '../fields';
import { PasswordFieldComponent } from '../fields/password';
import { ICreateSubDto, IID, IOption } from '@webpackages/model';
import { AutocompleteFieldComponent } from '../fields/autocomplete';

@Component({
  imports: [
    FormComponent,
    TextFieldComponent,
    PasswordFieldComponent,
    AutocompleteFieldComponent,
  ],
  standalone: true,
  selector: 'wt-sub-form',
  template: `
    <wt-form
      (submitEvent)="submitForm()"
      [submitLabel]="submitLabel"
      [formTitle]="formTitle"
      ]
    >
      <wt-text-field
        #username
        inputName="username"
        inputType="email"
        label="Username"
        prefixIcon="email"
        [required]="true"
      ></wt-text-field>

      <wt-password-field
        #password
        inputName="password"
        prefixIcon="password"
        label="Password"
        [required]="true"
      ></wt-password-field>

      <wt-text-field
        #orgname
        inputName="orgname"
        inputType="text"
        prefixIcon="store"
        label="Organization Name"
        [required]="true"
        [minLength]="3"
        [maxLength]="30"
      ></wt-text-field>

      <wt-autocomplete-field
        #subtype
        inputName="subtype"
        label="Subscription Type"
        prefixIcon="category"
        [options]="subtypeList"
        [required]="true"
      >
      </wt-autocomplete-field>
    </wt-form>
  `,
  providers: [
    {
      provide: FormGroup,
      useValue: new FormGroup<Record<keyof ICreateSubDto, FormControl>>({
        username: new FormControl(
          '',
          new InputValidator('username').required().isEmail().build()
        ),
        password: new FormControl(
          '',
          new InputValidator('password').required().password().build()
        ),
        orgname: new FormControl(
          '',
          new InputValidator('organization name')
            .required()
            .minlength(3)
            .maxlength(30)
            .build()
        ),
        subtype: new FormControl(
          '',
          new InputValidator('subscription type').required().build()
        ),
      }),
    },
  ],
})
export class SubFormComponent extends FormComponent<ICreateSubDto<IID>> {
  @ViewChild('username') username!: BaseFieldComponent;
  @ViewChild('password') password!: BaseFieldComponent;
  @ViewChild('orgname') orgname!: BaseFieldComponent;
  @ViewChild('subtype') subtype!: BaseFieldComponent;

  override formTitle: string = 'Sign Up Form';

  override submitLabel: string = 'Sign Up';

  /**
   * Subscription type options
   */
  @Input() subtypeList!: IOption[];

  focusUserName() {
    this.username.focus();
  }

  focusPassword() {
    this.password.focus();
  }

  focusOrgname() {
    this.orgname.focus();
  }

  focusSubType() {
    this.subtype.focus();
  }
}
