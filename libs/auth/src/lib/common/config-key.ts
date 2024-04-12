import { ConfigKeyFactory } from '@webpackages/common';
import { AUTH_MODULE_NAME } from './module-name';

const AppConfigFactory = new ConfigKeyFactory(AUTH_MODULE_NAME);

export function key(key: string) {
  return AppConfigFactory.key(key);
}
