/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@angular/core';

export const VIEW_COMPONENT_TOKEN = 'VIEW_COMPONENT_TOKEN';

/**
 * @param viewComponent Table, List, CardGrid etc.
 * @returns
 */
export function provideViewComponent(viewComponent: any): Provider {
  return {
    provide: VIEW_COMPONENT_TOKEN,
    useValue: viewComponent,
  };
}
