import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import {
  provideAppName,
  provideLocale,
  provideNavItems,
} from '@webpackages/material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),

    provideAnimations(),

    provideAppName('APP_NAME'),
    provideLocale(),
    provideNavItems([
      {
        path: '',
        icon: 'home',
        label: 'Home',
      },
      {
        path: 'about',
        icon: 'info',
        label: 'About',
      },
    ]),
  ],
};
