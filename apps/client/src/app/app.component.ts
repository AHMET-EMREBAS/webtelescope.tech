import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NavigationComponent } from '@webpackages/material';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  selector: 'wt-root',
  template: `
    <wt-navigation>
      <router-outlet></router-outlet>
    </wt-navigation>
  `,
})
export class AppComponent {}
