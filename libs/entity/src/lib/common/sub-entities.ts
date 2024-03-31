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
  TextColumn,
  TimestampEntity,
} from '@webpackages/typeorm';

export function EmailEntity<U extends IID>(owner: Type<U>) {
  class Email extends TimestampEntity implements IEmail<U> {
    @TextColumn(false) email!: string;
    @OwnerRelation(owner) user!: U;
  }
  return Email;
}

export function AddressEntity<U extends IID>(user: Type<U>) {
  class Address extends TimestampEntity implements IAddress<U> {
    @TextColumn() street!: string;
    @TextColumn() unit!: string;
    @TextColumn() city!: string;
    @TextColumn() state!: string;
    @TextColumn() zip!: string;
    @TextColumn() country!: string;
    @OwnerRelation(user) user!: U;
  }
  return Address;
}

export function PhoneEntity<U extends IID>(owner: Type<U>) {
  class Phone extends TimestampEntity implements IPhone<U> {
    @TextColumn() phone!: string;
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
    @TextColumn() imageName!: string;
    @TextColumn() href!: string;
    @OwnerRelation(owner) owner!: U;
  }
  return Phone;
}
