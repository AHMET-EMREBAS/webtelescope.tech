import { createProvider } from '@webpackages/core';
import { AuthClientModuleOptions } from './types';
import { HttpRequestConfigFactory } from '@webpackages/http-client';

export const [provideHttpOptions, InjectHttpOptions, getHttpOptionsToken] =
  createProvider<HttpRequestConfigFactory>('AuthHttpClientOptions');

export const [
  provideAuthClientModuleOptions,
  InjectAuthClientModuleOptions,
  getAuthClientModuleOptionsToken,
] = createProvider<AuthClientModuleOptions>('AuthClientModuleOptions');
