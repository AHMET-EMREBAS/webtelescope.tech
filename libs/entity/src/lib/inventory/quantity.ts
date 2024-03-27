import { IQuantity } from '@webpackages/model';
import { Sku } from './sku';
import { Store } from './store';
import {
  NumberColumn,
  OwnerRelation,
  TimestampEntity,
  WithIDEntity,
} from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Quantity
  extends WithIDEntity(TimestampEntity)
  implements IQuantity<Sku, Store>
{
  @NumberColumn() quantity!: number;
  @OwnerRelation(Sku) sku!: Sku;
  @OwnerRelation(Store) store!: Store;
}
