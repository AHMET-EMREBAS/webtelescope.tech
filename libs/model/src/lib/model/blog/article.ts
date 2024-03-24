import { IID, IOwner } from '../../common';

/**
 * @param id {@link IID.id}
 * @param title {@link title}
 * @param contents {@link contents}
 * @param owner {@link IOwner.owner}
 */
export interface IArticle<Owner extends IID> extends IID, IOwner<Owner> {
  /**
   * Article title
   */
  title: string;
}
