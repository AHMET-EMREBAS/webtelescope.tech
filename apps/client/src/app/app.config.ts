import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { NGRX_CONFIG } from './ngrx.config';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    ...NGRX_CONFIG.providers,
    provideRouter(APP_ROUTES, withHashLocation()),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
