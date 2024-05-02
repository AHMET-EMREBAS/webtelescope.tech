import {
  CreateAddressFor,
  CreateDepartmentFor,
  CreateEmailModelFor,
  CreateImageModelFor,
  CreatePhoneModelFor,
  CreateProfileModelFor,
  ManyRelation,
  Model,
  OneRelation,
  PasswordProperty,
  UserNameProperty,
} from '../../core';
import { RoleModel } from './role';

export const UserDepartment = CreateDepartmentFor('UserDepartment');

export const UserModel: Model = {
  modelName: 'User',
  properties: {
    username: UserNameProperty(),
    password: PasswordProperty(),
  },
  relations: {
    roles: ManyRelation(RoleModel),
    userDepartment: OneRelation(UserDepartment),
  },
};

export const UserImgModel: Model = CreateImageModelFor(UserModel);
export const UserAddressModel: Model = CreateAddressFor(UserModel);
export const UserEmailModel: Model = CreateEmailModelFor(UserModel);
export const UserPhoneModel: Model = CreatePhoneModelFor(UserModel);
export const UserProfileModel: Model = CreateProfileModelFor(UserModel);
