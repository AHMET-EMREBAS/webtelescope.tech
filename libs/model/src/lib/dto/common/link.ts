import { IID } from '../../common';
import { IURL } from '../../model';

export interface ICreateUrlDto extends Pick<IURL<IID>, 'url' | 'owner'> {}
