import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent, NavigationModule } from '@webpackages/navigation';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationModule, AppLayoutComponent],
  selector: 'wt-root',
  template: `
    <wt-app-layout>
      
      <router-outlet wtMainPanel></router-outlet>
    </wt-app-layout>
  `,
})
export class AppComponent {}
