import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProductReturn } from '@webpackages/gen-model';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
@Entity()
export class ProductReturn
  extends BaseEntity
  implements IProductReturn<Order, User>
{
  @Column({ type: 'string', required: true }) description!: string;
  @Column({ type: 'number', required: true }) quantity!: number;
  @Relation({ relationType: 'Owner', required: true, objectType: Order })
  order!: Order;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  user!: User;
}
