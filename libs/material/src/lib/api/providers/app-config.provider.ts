import { Provider } from '@angular/core';

/**
 * Sometimes we deploy multiple application together.
 * These applications are using the same components and services.
 * To differenciate the apps provide appname for each module if required.
 */
export const APP_NAME_TOKEN = 'APP_NAME_TOKEN';

export function provideAppName(appName: string): Provider {
  return {
    provide: APP_NAME_TOKEN,
    useValue: appName,
  };
}

/**
 * Sometimes we deploy multiple application together.
 * These applications are using the same components and services.
 * To differenciate the apps provide appname for each module if required.
 */
export const MODULE_NAME_TOKEN = 'MODULE_NAME_TOKEN';

/**
 * Module name and app name is used for common services to identify the resource.
 * For exmaple LocalStore services use appname and module name to persist configurations in browser localstoreage.
 * @param appName
 * @returns
 */
export function provideModuleName(appName: string): Provider {
  return {
    provide: MODULE_NAME_TOKEN,
    useValue: appName
  };
}
