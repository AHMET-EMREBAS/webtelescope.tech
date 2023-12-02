/* eslint-disable @nx/enforce-module-boundaries */
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
import { permissionRoutes } from './permission/routes';
import { priceRoutes } from './price/routes';
import { priceLevelRoutes } from './price-level/routes';
import { quantityRoutes } from './quantity/routes';
import { roleRoutes } from './role/routes';
import { skuRoutes } from './sku/routes';
import { storeRoutes } from './store/routes';
import { userRoutes } from './user/routes';

const childRoutes: [string, Routes][] = [
  ['category', categoryRoutes],
  ['permission', permissionRoutes],
  ['price', priceRoutes],
  ['price-level', priceLevelRoutes],
  ['product', productRoutes],
  ['quantity', quantityRoutes],
  ['role', roleRoutes],
  ['sku', skuRoutes],
  ['store', storeRoutes],
  ['user', userRoutes],
];
export const inventoryRoutes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: AppLayoutComponent,
    providers: [
      LocalStoreService,
      provideNavItems([
        { name: 'product', icon: 'inventory', route: 'product' },
        { name: 'sku', icon: 'barcode', route: 'sku' },
        { name: 'quantity', icon: 'numbers', route: 'quantity' },
        { name: 'price', icon: 'money', route: 'price' },
        { name: 'user', icon: 'person', route: 'user' },
        { name: 'permission', icon: 'security', route: 'permission' },
        { name: 'role', icon: 'security', route: 'role' },
        { name: 'store', icon: 'store', route: 'store' },
        { name: 'price-level', icon: 'layers', route: 'price-level' },
        { name: 'category', icon: 'category', route: 'category' },
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

    children: childRoutes.map(([name, routes]) => {
      return {
        path: name,
        providers: [
          LocalStoreService,
          provideAppName('Inventory'),
          provideModuleName(name),
        ],
        loadChildren: () => routes,
      };
    }),
  },
];
