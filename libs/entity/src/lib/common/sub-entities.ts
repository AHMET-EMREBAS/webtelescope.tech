import { Type } from '@nestjs/common';
import {
  IAddress,
  IEmail,
  IID,
  IImg,
  IPhone,
  IRecord,
} from '@webpackages/model';
import {
  ObjectColumn,
  OwnerRelation,
  StringColumn,
  TimestampEntity,
} from '@webpackages/typeorm';

export function EmailEntity<U extends IID>(owner: Type<U>) {
  class Email extends TimestampEntity implements IEmail<U> {
    @StringColumn() email!: string;
    @OwnerRelation(owner) user!: U;
  }
  return Email;
}

export function AddressEntity<U extends IID>(user: Type<U>) {
  class Address extends TimestampEntity implements IAddress<U> {
    @StringColumn() street!: string;
    @StringColumn() unit!: string;
    @StringColumn() city!: string;
    @StringColumn() state!: string;
    @StringColumn() zip!: string;
    @StringColumn() country!: string;
    @OwnerRelation(user) user!: U;
  }
  return Address;
}

export function PhoneEntity<U extends IID>(owner: Type<U>) {
  class Phone extends TimestampEntity implements IPhone<U> {
    @StringColumn() phone!: string;
    @OwnerRelation(owner) user!: U;
  }
  return Phone;
}

export function RecordEntity<U extends IID>(owner: Type<U>) {
  class Phone extends TimestampEntity implements IRecord<U> {
    @ObjectColumn() record!: Record<string, string>;
    @OwnerRelation(owner) owner!: U;
  }
  return Phone;
}

export function ImageEntity<U extends IID>(owner: Type<U>) {
  class Phone extends TimestampEntity implements IImg<U> {
    @StringColumn() imageName!: string;
    @StringColumn() url!: string;
    @OwnerRelation(owner) owner!: U;
  }
  return Phone;
}
