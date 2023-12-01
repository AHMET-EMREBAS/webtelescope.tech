import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        urlUpdateStrategy: 'eager',
      }),
      withHashLocation()
    ),
    provideAnimations(),
  ],
};
