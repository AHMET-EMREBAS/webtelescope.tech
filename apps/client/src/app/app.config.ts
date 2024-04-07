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
  AuthEntityDataModuleConfig,
  BlogEntityDataModuleConfig,
  InventoryEntityDataModuleConfig,
  OrderEntityDataModuleConfig,
  PermissionService,
  ProjectEntityDataModuleConfig,
  UserService,
} from '@webpackages/ngrx';
import { createAuthInterceptor } from '@webpackages/auth-client';

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    PermissionService,
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(
      withInterceptors([createAuthInterceptor('http://localhost:3000')])
    ),
    provideStore([]),
    provideEffects([]),
    provideEntityData(
      {
        pluralNames: {
          ...AuthEntityDataModuleConfig.pluralNames,
          ...BlogEntityDataModuleConfig.pluralNames,
          ...InventoryEntityDataModuleConfig.pluralNames,
          ...OrderEntityDataModuleConfig.pluralNames,
          ...ProjectEntityDataModuleConfig.pluralNames,
        },

        entityMetadata: {
          ...AuthEntityDataModuleConfig.entityMetadata,
          ...BlogEntityDataModuleConfig.entityMetadata,
          ...InventoryEntityDataModuleConfig.entityMetadata,
          ...OrderEntityDataModuleConfig.entityMetadata,
          ...ProjectEntityDataModuleConfig.entityMetadata,
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
