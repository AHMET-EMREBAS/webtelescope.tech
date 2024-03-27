import { IID } from '../../common';
import { IReview } from '../../model';

export interface ICreateReview
  extends Pick<IReview<IID, IID>, 'comment' | 'rate' | 'user' | 'target'> {}
