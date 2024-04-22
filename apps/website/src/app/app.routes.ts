import { Route } from '@angular/router';
import { IconsComponent } from '@webpackages/material';
import { MainAppLayoutComponent } from './app-layout.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => MainAppLayoutComponent,
  },
  {
    path: 'icons',
    loadComponent: () => IconsComponent,
  },
];
