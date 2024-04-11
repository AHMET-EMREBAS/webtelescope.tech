import { HttpRequestConfigFactory, createProvider } from '@webpackages/core';
import { AuthClientModuleOptions } from './types';

export const [provideHttpOptions, InjectHttpOptions, getHttpOptionsToken] =
  createProvider<HttpRequestConfigFactory>('AuthHttpClientOptions');

export const [
  provideAuthClientModuleOptions,
  InjectAuthClientModuleOptions,
  getAuthClientModuleOptionsToken,
] = createProvider<AuthClientModuleOptions>('AuthClientModuleOptions');
