import {
  CreateAddressFor,
  CreateEmailModelFor,
  CreateImageModelFor,
  CreatePhoneModelFor,
  CreateProfileModelFor,
  ManyRelation,
  Model,
  PasswordProperty,
  UserNameProperty,
} from '../../core';
import { DepartmentModel } from '../common';
import { RoleModel } from './role';

export const UserModel: Model = {
  modelName: 'User',
  properties: {
    username: UserNameProperty(),
    password: PasswordProperty(),
  },
  relations: {
    roles: ManyRelation(RoleModel),
    department: ManyRelation(DepartmentModel),
  },
};

export const UserImgModel: Model = CreateImageModelFor(UserModel);
export const UserAddressModel: Model = CreateAddressFor(UserModel);
export const UserEmailModel: Model = CreateEmailModelFor(UserModel);
export const UserPhoneModel: Model = CreatePhoneModelFor(UserModel);
export const UserProfileModel: Model = CreateProfileModelFor(UserModel);
