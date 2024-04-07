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
  selector: 'wt-forgot-password-form',
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
      }),
    },
  ],
})
export class ForgotPasswordFormComponent extends FormComponent<
  ICreateSubDto<IID>
> {
  @ViewChild('username') username!: BaseFieldComponent;

  override formTitle: string = 'Forgot Password';

  override submitLabel = 'Send Recovery Email';

  /**
   * Subscription type options
   */
  @Input() subTypes!: IOption[];

  focusUserName() {
    this.username.focus();
  }
}
