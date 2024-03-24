import { IID, IOwner, ITimestamp } from '../../common';

/**
 * Blog has many articles, each article is associated with a blog entity with owner property
 * @param id {@link IID.id}
 * @param author {@link author}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IBlog<Owner extends IID>
  extends IID,
    ITimestamp,
    IOwner<Owner> {
  /**
   * Blog title
   */
  title: string;
}
