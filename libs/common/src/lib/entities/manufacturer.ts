import { IAddress } from './address';
import { IBaseEntity } from './base';
import { IEmail } from './email';
import { IPhone } from './phone';

export interface IManufacturer extends IBaseEntity {
  name: string;
  addresses: IAddress[];
  emails: IEmail[];
  phones: IPhone[];
}
