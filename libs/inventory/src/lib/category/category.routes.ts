import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

export const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    title: 'Category',
    children: [
      {
        path: '',
        title: 'View Categories',
        loadComponent: () =>
          import('./view/view.component').then((e) => e.ViewComponent),
      },
      {
        path: 'create',
        title: 'Create Category',
        loadComponent: () =>
          import('./create/create.component').then((e) => e.CreateComponent),
      },
      {
        path: 'update/:id',
        title: 'Update Category',
        loadComponent: () =>
          import('./update/update.component').then((e) => e.UpdateComponent),
      },
      {
        path: 'delete/:id',
        title: 'Delete Category',
        loadComponent: () =>
          import('./delete/delete.component').then((e) => e.DeleteComponent),
      },
    ],
  },
];
