import { createProvider } from '@webpackages/core';
import { AuthClientModuleOptions } from './auth-client-options.ts.js';
import { HttpRequestConfigFactory } from '@webpackages/http-client';

export const [provideHttpOptions, InjectHttpOptions, getHttpOptionsToken] =
  createProvider<HttpRequestConfigFactory>('AuthHttpClientOptions');

export const [
  provideAuthClientModuleOptions,
  InjectAuthClientModuleOptions,
  getAuthClientModuleOptionsToken,
] = createProvider<AuthClientModuleOptions>('AuthClientModuleOptions');
