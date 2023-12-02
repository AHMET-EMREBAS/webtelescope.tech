import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      appRoutes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        urlUpdateStrategy: 'eager',
      }),
      withHashLocation()
      ),
      provideHttpClient(),
      provideStore(),
      provideEffects(),
      provideEntityData(entityConfig, withEffects()),
  ],
};
