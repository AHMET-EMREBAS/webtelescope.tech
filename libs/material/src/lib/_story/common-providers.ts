import {
  importProvidersFrom,
  Provider,
  EnvironmentProviders,
} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const commonProviders: (Provider | EnvironmentProviders)[] = [
  importProvidersFrom([BrowserAnimationsModule, RouterTestingModule]),
];
