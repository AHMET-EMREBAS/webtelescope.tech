import { IID, ITimestamp } from '../../common';

export interface IRootUser extends IID, ITimestamp {
  username: string;
  password: string;
}
