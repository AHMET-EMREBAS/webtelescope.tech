import { IID } from '../../common';
import { IQuestion } from '../../model';

export interface ICreateQuestionDto
  extends Pick<IQuestion<IID>, 'question' | 'user'> {}
