import { Routes } from '@angular/router';
import { ProductComponent } from './component';
import { provideResourceService } from '@webpackages/components';
import { ProductService } from './service';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    providers: [provideResourceService(ProductService)],
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
