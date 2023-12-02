/* eslint-disable @nx/enforce-module-boundaries */
import { Routes } from '@angular/router';
import { SkuComponent, SkuService } from './component';
import { provideResourceService } from '@webpackages/components';

export const skuRoutes: Routes = [
  {
    path: '',
    component: SkuComponent,
    providers: [provideResourceService(SkuService)],
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
