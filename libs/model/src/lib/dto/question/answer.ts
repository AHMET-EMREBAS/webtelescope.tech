import { IID } from '../../common';
import { IAnswer } from '../../model';

export interface ICreateAnswerDto
  extends Pick<IAnswer<IID, IID>, 'question' | 'user' | 'answer'> {}
