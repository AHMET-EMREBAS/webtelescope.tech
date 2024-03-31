import { IID } from '../../common';
import { IArticle } from '../../model';

export interface ICreateBlogDto extends Pick<IArticle<IID>, 'blog' | 'title'> {}
