import { Component, Input, ViewChild } from '@angular/core';
import { CommonFormModule, FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { ListSelectComponent, TextFieldComponent } from '../fields';
import { ICreateUserDto, IID, IOption } from '@webpackages/model';

@Component({
  imports: [
    CommonFormModule,
    FormComponent,
    TextFieldComponent,
    ListSelectComponent,
  ],
  standalone: true,
  selector: 'wt-user-form',
  template: `
    <wt-form
      (submitEvent)="submitForm()"
      [submitLabel]="submitLabel"
      [formTitle]="formTitle"
    >
      <wt-text-field
        #username
        inputName="username"
        inputType="email"
        label="Username"
        prefixIcon="email"
        [required]="true"
        [isUpdateField]="isUpdateForm"
      ></wt-text-field>

      <wt-list-select-field
        #roles
        inputName="roles"
        label="Select Roles"
        [items]="userRoles"
        [isUpdateField]="isUpdateForm"
      ></wt-list-select-field>
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
  @Input() userRoles!: IOption[];

  @ViewChild('username') username!: TextFieldComponent;
  @ViewChild('roles') roles!: ListSelectComponent;
  @Input() override formTitle: string = 'Create User';
  @Input() override submitLabel: string = 'Save';

  focusUserName() {
    this.username.focus();
  }

  focusRoles() {
    this.roles.focus();
  }
}
