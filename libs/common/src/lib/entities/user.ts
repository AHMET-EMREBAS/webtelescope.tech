import { IBaseEntity } from './base';
import { ICredential } from './credential';
import { IProfile } from './profile';

export interface IPermission extends IBaseEntity {
  name: string;
}

export interface IRole extends IBaseEntity {
  name: string;
  permissions: IPermission[];
}

export interface IUser extends IBaseEntity, ICredential {
  roles: IRole[];
  profile: IProfile;
}
