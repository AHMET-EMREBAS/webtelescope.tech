import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

export const priceRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./view/view.component').then((e) => e.ViewComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create/create.component').then((e) => e.CreateComponent),
      },
      {
        path: 'delete/:id',
        loadComponent: () =>
          import('./delete/delete.component').then((e) => e.DeleteComponent),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./update/update.component').then((e) => e.UpdateComponent),
      },
    ],
  },
];
