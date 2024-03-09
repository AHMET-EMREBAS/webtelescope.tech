import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormComponent } from '@webpackages/material';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormComponent],
  selector: 'wt-root',
  template: `<wt-form></wt-form><router-outlet></router-outlet>`,
})
export class AppComponent {}
