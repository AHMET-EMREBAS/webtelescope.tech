import { IID } from '../../common';
import { IPhone } from '../../model';

export interface ICreatePhoneDto extends Pick<IPhone<IID>, 'phone' | 'user'> {}
