import { IID } from '../../common';
import { IRecord } from '../../model';

export interface ICreateRecord extends Pick<IRecord<IID>, 'owner' | 'record'> {}
