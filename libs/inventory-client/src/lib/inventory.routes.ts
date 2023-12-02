import { Routes } from '@angular/router';
import { categoryRoutes } from './category/category.routes';
import {
  AppLayoutComponent,
  LocalStoreService,
  provideAppName,
  provideModuleName,
  provideNavItems,
  provideStatusbarItems,
  provideToolbarItems,
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
      ]),
      provideToolbarItems([
        { name: 'Settings', icon: 'settings', route: 'settings' },
      ]),
      provideStatusbarItems([
        {
          name: 'Notifications',
          icon: 'notifications',
          route: 'notifications',
        },
      ]),
      provideAppName('Inventory'),
      provideModuleName('Home'),
    ],
    children: [
      {
        path: 'category',
        providers: [
          LocalStoreService,
          provideAppName('Inventory'),
          provideModuleName('Category'),
        ],
        loadChildren: () => categoryRoutes,
      },
    ],
  },
];
