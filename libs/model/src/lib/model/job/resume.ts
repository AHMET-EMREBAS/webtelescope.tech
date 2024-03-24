import { INameDescription, IOwner } from '../../common';

export interface IResume<Owner, Experience, Address, Phone, Email>
  extends IOwner<Owner>,
    INameDescription {
  experiences: Experience[];
  address: Address;
  phone: Phone;
  email: Email;
}
