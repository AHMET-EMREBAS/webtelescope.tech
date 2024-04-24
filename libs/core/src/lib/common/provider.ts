import { Inject, Provider, Type } from '@nestjs/common';
import { v4 } from 'uuid';

/**
 * @return index 0 provideItem(value:T)
 * @return index 1 InjectItem()
 */
export type ProviderHandlers<T> = [
  (value: T) => Provider,
  () => PropertyDecorator & ParameterDecorator,
  () => string
];

export function createValueProvider<T>(prefix: string): ProviderHandlers<T> {
  const provide = prefix + v4();
  return [
    (useValue: T) => ({ provide, useValue }),
    () => Inject(provide),
    () => provide,
  ];
}

export function createClassProvider<T>(
  prefix: string
): ProviderHandlers<Type<T>> {
  const provide = prefix + v4();
  return [
    (useClass: Type<T>) => ({ provide, useClass }),
    () => Inject(provide),
    () => provide,
  ];
}
