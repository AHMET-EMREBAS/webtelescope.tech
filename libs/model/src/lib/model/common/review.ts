import { IID } from '../../common';
import { IComment } from './comment';
import { Range5 } from './range';

/**
 * @param id {@link IID.id}
 * @param comment {@link comment}
 * @param rate {@link Range5}
 * @param target {@link IComment.target} Task, Blog
 * @param owner {@link IComment.owner} User
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IReview<User extends IID, Target extends IID>
  extends IComment<User, Target> {
  /**
   * Rate 1 to 5
   */
  rate: Range5;
}
