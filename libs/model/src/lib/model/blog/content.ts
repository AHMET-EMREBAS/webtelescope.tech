import { IID, IOwner } from '../../common';

/**
 * Content is a paragraph.
 * @param id {@link IID.id}
 * @param contents {@link contents}
 * @param owner {@link IOwner.owner}
 */
export interface IContent<Owner extends IID> extends IID, IOwner<Owner> {
  /**
   * Article content
   */
  content: string;
}
