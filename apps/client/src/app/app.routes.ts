import { Route } from '@angular/router';
import { inventoryRoutes } from '@webpackages/inventory-client';

export const appRoutes: Route[] = [
  { path: '', loadChildren: () => inventoryRoutes },
];
