import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { NavigationModule } from '@webpackages/material';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationModule],
  selector: 'wt-root',
  template: `
    <wt-navigation>
      <router-outlet></router-outlet>
      <div wtToolbarRight>Toolbar Right</div>
    </wt-navigation>
  `,
})
export class AppComponent {
  constructor(private readonly title: Title) {
    title.setTitle('Initial Title');
  }
}
