import { Entity } from 'typeorm';
import {
  NumberColumn,
  ObjectId,
  ObjectIdProperty,
  OwnerRelation,
  PositiveIntegerProperty,
} from '../properties';
import { BaseEntity, BaseIDEntity } from './__base-entities';
import { Sku } from './store';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { Customer } from './customer';

/**
 * Order entity
 *
 *
 *
 *
 *
 */
@Entity()
export class Order<
  TCustomer extends BaseIDEntity = Customer
> extends BaseEntity {
  @OwnerRelation({ target: Customer }) customer!: TCustomer;
}

@Exclude()
export class CreateOrderDto implements Order<ObjectId> {
  @ObjectIdProperty({ required: true }) customer!: ObjectId;
}

@Exclude()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

/**
 * OrderItem entity
 *
 *
 *
 *
 *
 */
@Entity()
export class OrderItem<
  TSku extends BaseIDEntity = Sku,
  TOrder extends BaseIDEntity = Customer
> extends BaseEntity {
  @NumberColumn() quantity!: number;
  @OwnerRelation({ target: Sku }) sku!: TSku;
  @OwnerRelation({ target: Order }) order!: TOrder;
}

@Exclude()
export class CreateOrderItemDto implements OrderItem<ObjectId, ObjectId> {
  @PositiveIntegerProperty({ required: true }) quantity!: number;
  @ObjectIdProperty({ required: true }) sku!: ObjectId;
  @ObjectIdProperty({ required: true }) order!: ObjectId;
}

@Exclude()
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
