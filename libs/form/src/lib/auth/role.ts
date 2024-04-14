import { Component, Input, ViewChild } from '@angular/core';
import { CommonFormModule, FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { ListSelectComponent, TextFieldComponent } from '../fields';
import {
  ICreateRoleDto,
  ICreateUserDto,
  IID,
  IOption,
} from '@webpackages/model';

@Component({
  imports: [
    CommonFormModule,
    FormComponent,
    TextFieldComponent,
    ListSelectComponent,
  ],
  standalone: true,
  selector: 'wt-role-form',
  template: `
    <wt-form
      (submitEvent)="submitForm()"
      [submitLabel]="submitLabel"
      [formTitle]="formTitle"
    >
      <wt-text-field
        #role
        inputName="role"
        [required]="true"
        inputType="email"
        label="Role Name"
        prefixIcon="email"
        [isUpdateField]="isUpdateForm"
      ></wt-text-field>

      <wt-list-select-field
        #permissions
        inputName="permissions"
        label="Select Permissions"
        [items]="permissionList"
        [isUpdateField]="isUpdateForm"
      ></wt-list-select-field>
    </wt-form>
  `,
  providers: [
    {
      provide: FormGroup,
      useValue: new FormGroup<Record<keyof ICreateRoleDto, FormControl>>({
        role: new FormControl('', new InputValidator('Role').build()),
        permissions: new FormControl(
          [],
          new InputValidator('Permissions').build()
        ),
      }),
    },
  ],
})
export class RoleFormComponent extends FormComponent<ICreateUserDto<IID, IID>> {
  @ViewChild('role') role!: TextFieldComponent;
  @ViewChild('permissions') permissions!: ListSelectComponent;

  @Input() permissionList!: IOption[];
  @Input() override formTitle: string = 'Create New Role';
  @Input() override submitLabel: string = 'Save';

  focusRole() {
    this.role.focus();
  }

  focusPermissions() {
    this.permissions.focus();
  }
}
