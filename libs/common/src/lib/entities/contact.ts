import { IID, IOwnedEntity } from './base';
import { ICreateClockInDto } from './clockin';

export interface IEmail<U> extends IOwnedEntity<U> {
  email: string;
}

export interface ICreateEmailDto extends Pick<IEmail<IID>, 'email' | 'owner'> {}

export interface IUpdateEmailDto extends Partial<ICreateEmailDto> {}

export interface IPhone<U> extends IOwnedEntity<U> {
  phone: string;
}

export interface ICreatePhoneDto extends Pick<IPhone<IID>, 'phone' | 'owner'> {}

export interface IUpdatePhoneDto extends Partial<ICreatePhoneDto> {}

export interface IAddress<U> extends IOwnedEntity<U> {
  city: string;
  state: string;
  street: string;
  unit: string;
  zip: string;
}

export interface ICreateAddressDto
  extends Pick<IAddress<IID>, 'city' | 'state' | 'street' | 'unit' | 'zip'> {}

export interface IUpdateAddressDto extends Partial<ICreateAddressDto> {}

export interface IContact<U, E, A, P> extends IOwnedEntity<U> {
  addresses: A[];
  emails: E[];
  phones: P[];
}

export interface ICreateCotactDto
  extends Pick<
    Partial<IContact<IID, IID, IID, IID>>,
    'addresses' | 'emails' | 'phones' | 'owner'
  > {}

export interface IUpdateContactDto extends Partial<ICreateClockInDto> {}
