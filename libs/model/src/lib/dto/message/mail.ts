import { IMail } from '../../model';

export interface ICreateMailDto
  extends Pick<IMail, 'to' | 'from' | 'subject' | 'message' | 'sent'> {}
