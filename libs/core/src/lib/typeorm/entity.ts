import { Entity as EntityDecorator, ViewEntity as _ViewEntity } from 'typeorm';
import { ViewEntityOptions } from 'typeorm/decorator/options/ViewEntityOptions';

export function Entity() {
  return EntityDecorator();
}

export function ViewEntity(options?: ViewEntityOptions) {
  return _ViewEntity(options);
}
