import { Routes } from '@angular/router';
import { categoryRoutes } from './category/category.routes';
import { priceRoutes } from './price/category.routes';
import {
  AppLayoutComponent,
  LocalStoreService,
  provideAppName,
  provideModuleName,
  provideNavItems,
} from '@webpackages/components';
export const inventoryRoutes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: AppLayoutComponent,

    providers: [
      LocalStoreService,
      provideNavItems([
        { name: 'Category', icon: 'category', route: 'category' },
        { name: 'Price', icon: 'money', route: 'price' },
      ]),
      provideAppName('Inventory'),
      provideModuleName('Home'),
    ],
    children: [
      {
        path: 'category',
        loadChildren: () => categoryRoutes,
      },
      {
        path: 'price',
        loadChildren: () => priceRoutes,
      },
    ],
  },
];
