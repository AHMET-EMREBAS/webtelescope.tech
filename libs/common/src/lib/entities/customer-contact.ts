import { ICustomer } from './customer';
import { IUserContact } from './user-contact';

export interface ICustomerContact extends IUserContact<ICustomer> {}
