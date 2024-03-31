import { IID } from '../../common';
import { IReview } from '../../model';

export interface ICreateReviewDto
  extends Pick<IReview<IID, IID>, 'comment' | 'rate' | 'user' | 'target'> {}
