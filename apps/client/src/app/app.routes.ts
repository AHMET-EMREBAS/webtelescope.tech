import { Route } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import {
  CategoryFormComponent,
  CategoryTableComponent,
} from '@webpackages/gen-crud';

export const APP_ROUTES: Route[] = [
  { path: '', component: SampleComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'category', component: CategoryFormComponent },
  { path: 'categories', component: CategoryTableComponent },
];
