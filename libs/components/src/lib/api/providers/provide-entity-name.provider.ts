import { Provider } from '@angular/core';

export const ENTITY_NAME_TOKEN = 'ENTITY_NAME_TOKEN';

export function provideEntityName(name: string): Provider {
  return {
    provide: ENTITY_NAME_TOKEN,
    useValue: name,
  };
}
