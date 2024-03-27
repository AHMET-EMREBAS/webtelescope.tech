import { IID } from '../../common';
import { IContent } from '../../model';

export interface ICreateContentDto
  extends Pick<IContent<IID>, 'content' | 'article'> {}
