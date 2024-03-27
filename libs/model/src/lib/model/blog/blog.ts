import { IID, ITimestamp } from '../../common';

/**
 * Blog has many articles, each article is associated with a blog entity with owner property
 * @param id {@link IID.id}
 * @param author {@link User}
 * @param title {@link title}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IBlog<User extends IID> extends IID, ITimestamp {
  title: string;
  author: User;
}
