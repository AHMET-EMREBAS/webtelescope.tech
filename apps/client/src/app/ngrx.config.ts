import { ApplicationConfig, Type } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { APP_INTERCEPTORS } from './common';
import { CategoryService } from '@webpackages/gen-crud';

const COLLECTION_SERVICES: Type<unknown>[] = [CategoryService];

export const NGRX_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors(APP_INTERCEPTORS)),
    provideStore({}),
    provideEffects([]),
    provideEntityData(
      {
        entityMetadata: { Category: {} },
        pluralNames: { Category: 'Categories' },
      },
      withEffects()
    ),
    ...COLLECTION_SERVICES,
  ],
};
