import { IID } from '../../common';
import { IComment } from '../../model';

export interface ICreateCommentDto
  extends Pick<IComment<IID, IID>, 'comment' | 'user' | 'target'> {}
