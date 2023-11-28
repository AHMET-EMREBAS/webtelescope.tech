import { Route } from '@angular/router';
import { websiteRoutes } from './website/website.routes';

export const appRoutes: Route[] = [
  { path: '', loadChildren: () => websiteRoutes },
];
