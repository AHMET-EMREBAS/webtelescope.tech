import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IQuantity } from '@webpackages/gen-model';
import { Sku } from '../sku/sku.entity';
import { Store } from '../store/store.entity';
@Entity()
export class Quantity extends BaseEntity implements IQuantity<Sku, Store> {
  /**
   * Quantity of the Product-Sku in the store.
   */ @Column({
    type: 'number',
    required: true,
    description: 'Quantity of the Product-Sku in the store.',
  })
  quanitty!: number;
  @Relation({ relationType: 'Owner', required: true, objectType: Sku })
  sku!: Sku;
  @Relation({ relationType: 'Owner', required: true, objectType: Store })
  store!: Store;
}
