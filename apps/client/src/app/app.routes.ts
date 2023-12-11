import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@webpackages/inventory').then((e) => e.inventoryRoutes),
  },
];
