import { Route, Routes } from '@angular/router';
import * as Components from './__exports/components';

const ENTRIES = Object.entries(Components);

export const AngularMaterialRoute: Routes = ENTRIES.map(([key, value]) => {
  return {
    path: key.toString(),
    title: key.toString(),
    loadComponent: () => value,
  } as Route;
});
