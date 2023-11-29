/* eslint-disable @nx/enforce-module-boundaries */
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WebLayoutComponent, provideNavItems } from '@webpackages/material';
import { InventoryComponent } from '../inventory/inventory.component';
import { PosComponent } from '../pos/pos.component';
import { ProjectManagementComponent } from '../project-management/project-management.component';

export const websiteRoutes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    providers: [
      provideNavItems([
        { name: 'Home', route: '', icon: 'home' },
        { name: 'Services', route: 'services', icon: 'apps' },
        { name: 'About', route: 'about', icon: 'info' },
        { name: 'Contact', route: 'contact', icon: 'message' },
      ]),
    ],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact.component').then((e) => e.ContactComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then((e) => e.AboutComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(
            (e) => e.ServicesComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then(
            (e) => e.SettingsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((e) => e.ProfileComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@webpackages/material').then((e) => e.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('@webpackages/material').then((e) => e.SignupComponent),
      },
    ],
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'pos',
    component: PosComponent,
  },
  {
    path: 'project-management',
    component: ProjectManagementComponent,
  },
];
