import { IID } from '../../common';

/**
 * Content is a paragraph.
 * @param id {@link IID.id}
 * @param content {@link content}
 * @param owner {@link IOwner.owner}
 */
export interface IContent<Article extends IID> extends IID {
  /**
   * Article content
   */
  content: string;

  article: Article;
}
