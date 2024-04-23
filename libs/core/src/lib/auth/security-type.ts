import { EnumFactory } from '@webpackages/common';

export enum SecurityType {
  AUTH_COOKIE = 'auth cookie',
  API_KEY = 'api key',
  CREDENTIALS = 'credentials',
}

export const SecurityTypeMatcher = EnumFactory.create(SecurityType);
