import { ICustomer } from '@webpackages/model';
import { Org } from '../auth';
import { PriceLevel } from '../inventory';
import {
  OneRelation,
  PasswordColumn,
  TimestampEntity,
  Entity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import {
  AddressEntity,
  EmailEntity,
  ImageEntity,
  RecordEntity,
} from '../common';

@Entity()
export class Customer
  extends TimestampEntity
  implements ICustomer<Org, PriceLevel>
{
  @OneRelation(Org) organization!: Org;
  @OneRelation(PriceLevel) priceLevel!: PriceLevel;
  @UniqueNameColumn() username!: string;
  @PasswordColumn() password!: string;
}

@Entity()
export class CustomerEmail extends EmailEntity(Customer) {}

@Entity()
export class CustomerAddress extends AddressEntity(Customer) {}

@Entity()
export class CustomerImage extends ImageEntity(Customer) {}

@Entity()
export class CustomerRecord extends RecordEntity(Customer) {}
