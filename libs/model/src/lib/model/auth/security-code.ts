import { IID, ITimestamp } from '../../common';

export interface ISecurityCode extends ITimestamp, IID {
  securityCode: string;
  userId: number;
}
