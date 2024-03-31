import { IID } from '../../common';
import { ISession } from '../../model';

export interface ICreateSessionDto
  extends Pick<ISession<IID>, 'deviceId' | 'permissions' | 'user'> {}
