import { IMail } from '../../model';

export interface ICreateMailDto
  extends Pick<IMail, 'to' | 'subject' | 'message' | 'sent'> {}
