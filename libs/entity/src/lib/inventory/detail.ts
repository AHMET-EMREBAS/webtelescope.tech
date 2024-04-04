/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IDEntity,
  ObjectColumn,
  OwnerRelation,
  Entity,
} from '@webpackages/typeorm';
import { Sku } from './sku';

@Entity()
export class Detail extends IDEntity {
  @ObjectColumn() detail!: Record<string, any>;
  @OwnerRelation(Sku) sku!: Sku;
}
