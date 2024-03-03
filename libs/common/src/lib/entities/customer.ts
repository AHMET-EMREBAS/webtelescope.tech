import { IID, ITimestampEntity } from './base';
import { ICredential } from './credential';

export interface ICustomer<P> extends ITimestampEntity, ICredential {
  priceLevel: P;
}

export interface ICreateCustomerDto
  extends Pick<ICustomer<IID>, 'username' | 'password' | 'priceLevel'> {}

export interface IUpdateCustomerDto extends Partial<ICreateCustomerDto> {}
