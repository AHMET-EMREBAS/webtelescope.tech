import { IdDto, Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateCustomerDto {
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;

  @Property({ type: 'string', required: true, format: 'password' })
  password!: string;

  @Property({ type: 'string', required: true, minLength: 3, maxLength: 50 })
  firstName!: string;

  @Property({ type: 'string', required: true, minLength: 3, maxLength: 50 })
  lastName!: string;

  @Property({ type: 'string', required: true, minLength: 3, maxLength: 50 })
  organization!: string;

  @Property({ type: 'string', format: 'phone' })
  phone!: string;

  @Property({ type: 'integer', required: true, target: IdDto })
  priceLevel!: IdDto;
}
