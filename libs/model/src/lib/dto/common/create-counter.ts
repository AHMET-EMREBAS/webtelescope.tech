import { IID } from '../../common';
import { ICounter } from '../../model';


export interface ICreateCounter
  extends Pick<ICounter<IID, IID>, 'user' | 'target'> {}
