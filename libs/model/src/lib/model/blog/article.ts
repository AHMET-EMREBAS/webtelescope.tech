import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param title {@link title}
 * @param blog {@link blog}
 */
export interface IArticle<Blog extends IID> extends IID {
  title: string;
  blog: Blog;
}
