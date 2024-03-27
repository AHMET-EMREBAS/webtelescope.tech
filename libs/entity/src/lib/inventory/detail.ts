import { Entity } from 'typeorm';
import { IDEntity, ObjectColumn, OwnerRelation } from '../common';
import { Sku } from './sku';

@Entity()
export class Detail extends IDEntity {
  @ObjectColumn() detail!: string;
  @OwnerRelation(Sku) sku!: Sku;
}
