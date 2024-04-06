import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCommonModule } from '../../form/common';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormControl, FormGroup } from '@angular/forms';
import { provideFormGroup } from '../../api';
import { InputValidator } from '../../form/validators';

import { AuthClientService } from '@webpackages/auth-client';
@Component({
  selector: 'wt-login',
  standalone: true,
  imports: [CommonModule, FormCommonModule, FormFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    provideFormGroup(
      new FormGroup({
        username: new FormControl(
          '',
          new InputValidator('username').required().isEmail().build()
        ),
        password: new FormControl(
          '',
          new InputValidator('password').required().password().build()
        ),
      })
    ),
  ],
})
export class LoginComponent {
  formSubmitted = false;

  users$ = this.authClient.users();
  constructor(
    public readonly formGroup: FormGroup,
    public readonly authClient: AuthClientService
  ) {}

  submit(event: any) {
    this.formSubmitted = true;
    this.authClient.login(this.formGroup.value).subscribe((result) => {
      console.log('Result:', result);
    });
    console.log(this.formGroup.value);
  }
}
