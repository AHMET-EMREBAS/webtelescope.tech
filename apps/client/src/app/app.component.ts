import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AppLayoutComponent,
  NavListComponent,
  NavigationModule,
} from '@webpackages/navigation';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AppLayoutComponent,
    NavListComponent,
  ],
  selector: 'wt-root',
  template: `
    <wt-app-layout>
      <ng-container wtLeftPanel>
        <wt-nav-list
          [listItems]="[
            { label: 'home', icon: 'home', route: '', iconColor: 'primary' },
            {
              label: 'about',
              icon: 'info',
              iconColor: 'primary'
            }
          ]"
          [title]="'Main'"
        ></wt-nav-list>
      </ng-container>

      <ng-container wtRightPanel>
        <wt-nav-list
          [listItems]="[
            {
              label: 'user',
              icon: 'person',
             iconColor: 'primary'
            },
            {
              label: 'role',
                icon: 'security',
              iconColor: 'primary',
            },
            {
              label: 'permission',
              icon: 'security',
              iconColor: 'primary',
            }
          ]"
          [title]="'Administrator'"
        ></wt-nav-list>
      </ng-container>

      <router-outlet wtMainPanel></router-outlet>
    </wt-app-layout>
  `,
})
export class AppComponent {}
