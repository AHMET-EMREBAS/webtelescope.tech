import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

const HTTP_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const cloned = req.clone({ url: `http://localhost:3000/${url}` });
  return next(cloned);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(withInterceptors([HTTP_INTERCEPTOR])),
    provideStore([]),
    provideEffects([]),
    provideEntityData(
      {
        pluralNames: {
          Sample: 'Samples',
        },
        entityMetadata: {
          Sample: {},
        },
      },
      withEffects()
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimations(),
  ],
};
