import { ApplicationConfig, Type } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SampleService } from './services';
import { APP_INTERCEPTORS } from './common';

const COLLECTION_SERVICES: Type<unknown>[] = [SampleService];

export const NGRX_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors(APP_INTERCEPTORS)),
    provideStore({}),
    provideEffects([]),
    provideEntityData(
      {
        entityMetadata: { Sample: {} },
        pluralNames: { Sample: 'Samples' },
      },
      withEffects()
    ),
    ...COLLECTION_SERVICES,
  ],
};