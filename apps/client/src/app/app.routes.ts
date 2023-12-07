import { Route } from '@angular/router';
import {
  NavigationComponent,
  provideNavigationItems,
} from '@webpackages/material';
export const appRoutes: Route[] = [
  {
    path: '',
    component: NavigationComponent,
    providers: [
      provideNavigationItems([
        { label: 'Category', icon: 'category', route: '' },
      ]),
    ],
  },
];
