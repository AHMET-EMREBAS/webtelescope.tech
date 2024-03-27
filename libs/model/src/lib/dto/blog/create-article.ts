import { IID } from '../../common';
import { IArticle } from '../../model';

export interface ICreateArticleDto extends Pick<IArticle<IID>, 'blog' | 'title'> {}
