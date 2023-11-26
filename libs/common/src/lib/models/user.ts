import { BaseModel } from './base';

export interface UserModel<Role> extends BaseModel {
  username: string;
  password: string;
  roles: Role[];
}
