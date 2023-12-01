import { Routes } from '@angular/router';
import { categoryRoutes } from './category/category.routes';
import { InventoryNavigationComponent } from './inventory-navigation.component';
import { priceRoutes } from './price/category.routes';

export const inventoryRoutes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: InventoryNavigationComponent,
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
