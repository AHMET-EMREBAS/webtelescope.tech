import { IID } from '../../common';
import { ICustomer } from '../../model';

export interface ICreateCustomerDto
  extends Pick<
    ICustomer<IID, IID>,
    'organization' | 'priceLevel' | 'username' | 'password'
  > {}
