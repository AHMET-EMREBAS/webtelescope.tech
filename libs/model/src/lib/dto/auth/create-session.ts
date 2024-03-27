import { ISession } from '../../model';

export interface ICreateSessionDto
  extends Pick<ISession, 'deviceId' | 'permissions'> {}
