import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IOrder } from '@webpackages/common';
import { Sku } from '../sku/sku.entity';
import { Cart } from '../cart/cart.entity';
@Entity()
export class Order extends BaseEntity implements IOrder {
  @Column({ type: 'number', required: true }) quantity!: number;
  @Column({ type: 'number' }) discount?: number;
  @Column({ type: 'number', required: true }) total!: number;
  @Column({ type: 'number', required: true }) subTotal!: number;
  @Column({ type: 'number', required: true }) tax!: number;
  /**
   * Order description or notes
   */ @Column({ type: 'string', description: 'Order description or notes' })
  description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Sku })
  sku!: Sku;
  @Relation({ relationType: 'Owner', required: true, objectType: Cart })
  cart!: Cart;
}
