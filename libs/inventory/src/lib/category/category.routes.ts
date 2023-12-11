import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';

export const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    title: 'Category',
    providers: [CategoryService],
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
          import('./create/create.component').then((e) => e.CreateComponent),
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
