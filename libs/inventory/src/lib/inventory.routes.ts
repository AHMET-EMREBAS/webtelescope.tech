import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { categoryRoutes } from './category/category.routes';

export const inventoryRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'category',
        loadChildren: () => categoryRoutes,
      },
    ],
  },
];
