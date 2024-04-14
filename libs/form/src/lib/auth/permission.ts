import { Component, Input, ViewChild } from '@angular/core';
import { CommonFormModule, FormComponent, InputValidator } from '../form';
import { FormControl, FormGroup } from '@angular/forms';
import { ListSelectComponent, TextFieldComponent } from '../fields';
import { ICreatePermissionDto, ICreateUserDto, IID } from '@webpackages/model';

@Component({
  imports: [
    CommonFormModule,
    FormComponent,
    TextFieldComponent,
    ListSelectComponent,
  ],
  standalone: true,
  selector: 'wt-permission-form',
  template: `
    <wt-form
      (submitEvent)="submitForm()"
      [submitLabel]="submitLabel"
      [formTitle]="formTitle"
    >
      <wt-text-field
        #permission
        inputName="permission"
        inputType="text"
        label="Permission Name"
        prefixIcon="security"
        [required]="true"
        [minLength]="3"
        [maxLength]="30"
        [isUpdateField]="isUpdateForm"
      ></wt-text-field>
    </wt-form>
  `,
  providers: [
    {
      provide: FormGroup,
      useValue: new FormGroup<Record<keyof ICreatePermissionDto, FormControl>>({
        permission: new FormControl(
          '',
          new InputValidator('permission')
            .required()
            .minlength(3)
            .maxlength(30)
            .build()
        ),
      }),
    },
  ],
})
export class PermissionFormComponent extends FormComponent<
  ICreateUserDto<IID, IID>
> {
  @ViewChild('permission') permission!: TextFieldComponent;
  @Input() override formTitle: string = 'Create New Permission';
  @Input() override submitLabel: string = 'Save';

  focusPermission() {
    this.permission.focus();
  }
}
