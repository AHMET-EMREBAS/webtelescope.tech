import { IBaseEntity } from './base';
import { IFile } from './file';
import { IUser } from './user';

export interface IMessage extends IBaseEntity {
  from: IUser;
  to: IUser[];
  message: string;
  attachments: IFile[];
}
