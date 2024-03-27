import { IID } from '../../common';
import { IEmail } from '../../model';

export interface ICreateEmailDto extends Pick<IEmail<IID>, 'email' | 'user'> {}
