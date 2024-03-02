import { IAddress } from './address';
import { IBaseEntity } from './base';
import { IEmail } from './email';
import { IPhone } from './phone';

export interface IUserContact<U> extends IBaseEntity {
  emails: IEmail[];
  addresses: IAddress[];
  phones: IPhone[];
  user: U;
}
