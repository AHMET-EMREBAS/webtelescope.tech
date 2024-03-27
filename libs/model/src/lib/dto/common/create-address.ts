import { IID } from '../../common';
import { IAddress } from '../../model';

export interface ICreateAddressDto extends Omit<IAddress<IID>, 'id'> {}
