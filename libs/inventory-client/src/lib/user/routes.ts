/* eslint-disable @nx/enforce-module-boundaries */
import { Routes } from '@angular/router';
import { UserComponent, UserService } from './component';
import { provideResourceService } from '@webpackages/components';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    providers: [provideResourceService(UserService)],
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
