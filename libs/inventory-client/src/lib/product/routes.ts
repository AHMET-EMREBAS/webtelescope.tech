/* eslint-disable @nx/enforce-module-boundaries */
import { Routes } from '@angular/router';
import { ProductComponent, ProductService } from './component';
import { provideResourceService } from '@webpackages/components';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    providers: [provideResourceService(ProductService)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@webpackages/components').then((e) => e.TableComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create/create.component').then((e) => e.CreateComponent),
      },
      {
        path: 'delete/:id',
        loadComponent: () =>
          import('@webpackages/components').then((e) => e.DeleteItemComponent),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./update/update.component').then((e) => e.UpdateComponent),
      },
    ],
  },
];
