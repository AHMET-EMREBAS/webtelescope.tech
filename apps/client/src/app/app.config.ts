import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AuthClientService,
  createClientAuthServiceHttpInterceptor,
} from '@webpackages/auth-client';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthClientService,
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(
      withInterceptors([
        createClientAuthServiceHttpInterceptor({
          baseURL: 'http://localhost:3001',
          appName: 'main',
          oauthApiKey: '',
          orgname: 'main',
        }),
      ])
    ),
    provideStore([]),
    provideEffects([]),
    provideEntityData({}, withEffects()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimations(),
  ],
};
