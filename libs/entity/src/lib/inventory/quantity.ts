import { IQuantity } from '@webpackages/model';
import { Sku } from './sku';
import { Store } from './store';
import {
  NumberColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Quantity extends TimestampEntity implements IQuantity<Sku, Store> {
  @NumberColumn() quantity!: number;
  @OwnerRelation(Sku) sku!: Sku;
  @OwnerRelation(Store) store!: Store;
}
