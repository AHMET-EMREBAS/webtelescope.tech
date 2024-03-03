import { IBasicEntity, ITimestampEntity } from './base';
import { ICredential } from './credential';

export interface IPermission extends IBasicEntity {
  name: string;
}

export interface IRole<P> extends IBasicEntity {
  name: string;
  permissions: P[];
}

export interface IUser<R> extends ITimestampEntity, ICredential {
  roles: R[];
}
