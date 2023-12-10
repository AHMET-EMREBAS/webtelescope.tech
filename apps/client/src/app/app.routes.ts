import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@webpackages/inventory').then((e) => e.NavigationComponent),
  },
];
