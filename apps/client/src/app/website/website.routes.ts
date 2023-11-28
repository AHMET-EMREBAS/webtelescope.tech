import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WebLayoutComponent, provideNavItems } from '@webpackages/material';

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
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(
            (e) => e.ServicesComponent
          ),
      },
    ],
  },
];
