import {
  Model,
  PasswordProperty,
  UserNameProperty,
  CreateAddressFor,
  CreateEmailModelFor,
  CreateImageModelFor,
  CreatePhoneModelFor,
  CreateProfileModelFor,
} from '../../core';

export const CustomerModel: Model = {
  modelName: 'Customer',
  properties: {
    username: UserNameProperty(),
    password: PasswordProperty(),
  },
};

export const CustomerImgModel: Model = CreateImageModelFor(CustomerModel);
export const CustomerAddressModel: Model = CreateAddressFor(CustomerModel);
export const CustomerEmailModel: Model = CreateEmailModelFor(CustomerModel);
export const CustomerPhoneModel: Model = CreatePhoneModelFor(CustomerModel);
export const CustomerProfileModel: Model = CreateProfileModelFor(CustomerModel);
