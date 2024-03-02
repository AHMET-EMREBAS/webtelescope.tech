import { IAddress } from './address';
import { IBaseEntity } from './base';
import { ICredential } from './credential';
import { IEmail } from './email';
import { IPhone } from './phone';
import { IPriceLevel } from './price-level';
import { IProfile } from './profile';
import { IUser } from './user';

export interface ICustomer extends IBaseEntity, ICredential {
  emails: IEmail[];
  addresses: IAddress[];
  phones: IPhone[];
  associates: IUser[];
  priceLevel: IPriceLevel;
  profile: IProfile;
}
