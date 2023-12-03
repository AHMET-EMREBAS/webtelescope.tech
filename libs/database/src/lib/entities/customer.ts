import { Entity } from 'typeorm';
import {
  BaseCredentialEntity,
  BaseIDEntity,
  BaseNameEntity,
  BaseCredentialDto,
  BaseNameDto,
} from './base.entity';
import { ObjectId, ObjectIdProperty, OneRelation } from '../properties';

import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

/**
 * Customer Type
 *
 *
 *
 *
 *
 */
@Entity()
export class CustomerType extends BaseNameEntity {}

@Exclude()
export class CreateCustomerTypeDto extends BaseNameDto {}

@Exclude()
export class UpdateCustomerTypeDto extends PartialType(CreateCustomerTypeDto) {}

/**
 * Customer
 *
 *
 *
 *
 *
 */
@Entity()
export class Customer<
  TCustomerType extends BaseIDEntity
> extends BaseCredentialEntity {
  @OneRelation({ target: CustomerType }) customerType!: TCustomerType;
}

@Exclude()
export class CreateCustomerDto
  extends BaseCredentialDto
  implements Customer<BaseIDEntity>
{
  @ObjectIdProperty({ required: true }) customerType!: ObjectId;
}

@Exclude()
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
