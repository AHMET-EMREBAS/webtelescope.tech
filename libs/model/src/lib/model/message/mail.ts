import { IID, ITimestamp } from '../../common';

export interface IMail extends ITimestamp, IID {
  to: string;
  subject: string;
  message: string;
  sent?: boolean;
}
