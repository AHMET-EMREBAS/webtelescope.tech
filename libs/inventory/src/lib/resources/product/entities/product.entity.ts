import { BaseNameDescriptionEntity, Relation } from '@webpackages/core';
import { Entity } from 'typeorm';
import { Category } from '../../category';

@Entity()
export class Product extends BaseNameDescriptionEntity {
  @Relation({ type: 'subs', target: Category })
  categories!: Category[];
}
