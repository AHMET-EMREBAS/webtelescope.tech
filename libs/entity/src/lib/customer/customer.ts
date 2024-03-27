import { ICustomer } from '@webpackages/model';
import { Organization } from '../auth';
import { PriceLevel } from '../inventory';
import {
  NameColumn,
  OneRelation,
  PasswordColumn,
  TimestampEntity,
} from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Customer
  extends TimestampEntity
  implements ICustomer<Organization, PriceLevel>
{
  @OneRelation(Organization) organization!: Organization;
  @OneRelation(PriceLevel) priceLevel!: PriceLevel;
  @NameColumn() username!: string;
  @PasswordColumn() password!: string;
}
