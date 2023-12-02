import { Routes } from '@angular/router';
import {
  AppLayoutComponent,
  LocalStoreService,
  provideAppName,
  provideModuleName,
  provideNavItems,
  provideStatusbarItems,
  provideToolbarItems,
} from '@webpackages/components';
import { categoryRoutes } from './category/category.routes';
import { productRoutes } from './product/routes';

export const inventoryRoutes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: AppLayoutComponent,
    providers: [
      LocalStoreService,
      provideNavItems([
        { name: 'Category', icon: 'category', route: 'category' },
        { name: 'Product', icon: 'inventory', route: 'product' },
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
      {
        path: 'product',
        providers: [
          LocalStoreService,
          provideAppName('Inventory'),
          provideModuleName('Product'),
        ],
        loadChildren: () => productRoutes,
      },
    ],
  },
];
