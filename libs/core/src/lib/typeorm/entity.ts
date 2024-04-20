import { Entity as EntityDecorator } from 'typeorm';

export function Entity() {
  return EntityDecorator();
}
