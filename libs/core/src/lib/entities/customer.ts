import { Entity } from 'typeorm';
import {
  BaseCredentialEntity,
  BaseIDEntity,
  BaseNameEntity,
  BaseCredentialDto,
  BaseNameDto,
  BaseEntity,
  BaseUserDetailDto,
  BaseUserDetailEntity,
} from './__base-entities';
import {
  ObjectId,
  ObjectIdProperty,
  OneRelation,
  OwnerRelation,
  PhoneProperty,
  TextColumn,
  URLProperty,
  UniqueTextColumn,
  UsernameProperty,
} from '../properties';

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
  TCustomerType extends BaseIDEntity = CustomerType
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

/**
 * Customer Credentials
 *
 *
 *
 *
 *
 */
@Entity()
export class CustomerCredential<
  TCustomer extends BaseIDEntity = Customer
> extends BaseCredentialEntity {
  @OwnerRelation({ target: Customer }) user!: TCustomer;
}

@Exclude()
export class CreateCustomerCredentialDto
  extends BaseCredentialDto
  implements CustomerCredential<BaseIDEntity>
{
  @ObjectIdProperty({ required: true }) user!: BaseIDEntity;
}

@Exclude()
export class UpdateCustomerCredentialDto extends PartialType(
  CreateCustomerCredentialDto
) {}

/**
 * Customer
 *
 *
 *
 *
 *
 */
@Entity()
export class CustomerDetail<
  TCustomerType extends BaseIDEntity = CustomerType
> extends BaseUserDetailEntity {
  @OneRelation({ target: CustomerType }) customerType!: TCustomerType;
}

@Exclude()
export class CreateCustomerDetailDto
  extends BaseUserDetailDto
  implements CustomerDetail<ObjectId>
{
  @ObjectIdProperty({ required: true }) customerType!: ObjectId;
}

@Exclude()
export class UpdateCustomerDetailDto extends PartialType(
  CreateCustomerDetailDto
) {}

/**
 * Customer Email
 *
 *
 *
 *
 */
@Entity()
export class CustomerEmail<
  TCustomer extends BaseIDEntity = Customer
> extends BaseEntity {
  @UniqueTextColumn()
  email!: string;

  @OwnerRelation({ target: Customer })
  user!: TCustomer;
}

@Exclude()
export class CreateCustomerEmailDto implements CustomerEmail<ObjectId> {
  @UsernameProperty({ required: true }) email!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateCustomerEmailDto extends PartialType(
  CreateCustomerEmailDto
) {}

/**
 * Customer phone
 *
 *
 *
 *
 */
@Entity()
export class CustomerPhone<
  TCustomer extends BaseIDEntity = Customer
> extends BaseEntity {
  @UniqueTextColumn()
  phone!: string;

  @OwnerRelation({ target: Customer })
  user!: TCustomer;
}

@Exclude()
export class CreateCustomerPhoneDto implements CustomerPhone<ObjectId> {
  @PhoneProperty({ required: true }) phone!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateCustomerPhoneDto extends PartialType(
  CreateCustomerPhoneDto
) {}

/**
 * Customer image
 *
 *
 *
 *
 */
@Entity()
export class CustomerImage<
  TCustomer extends BaseIDEntity = Customer
> extends BaseEntity {
  @TextColumn()
  url!: string;

  @OwnerRelation({ target: Customer })
  user!: TCustomer;
}

@Exclude()
export class CreateCustomerImageDto implements CustomerImage<ObjectId> {
  @URLProperty({ required: true }) url!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateCustomerImageDto extends PartialType(
  CreateCustomerImageDto
) {}
