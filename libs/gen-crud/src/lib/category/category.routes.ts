import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table.component';
import { CategoryDashboardComponent } from './category-dashboard.component';
import { CategoryFormComponent } from './category-form.component';

export const CategoryRoutes: Routes = [
  { path: '', loadComponent: () => CategoryDashboardComponent },
  { path: 'categories', loadComponent: () => CategoryTableComponent },
  { path: 'category', loadComponent: () => CategoryFormComponent },
  { path: 'category/:id', loadComponent: () => CategoryFormComponent },
];
