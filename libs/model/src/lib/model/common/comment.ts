import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param comment {@link comment}
 * @param user {@link User} Who made this comment
 * @param target {@link Target} To which entity this comment is made.
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IComment<User extends IID, Target extends IID>
  extends IID,
    ITimestamp {
  comment: string;
  target: Target;
  user: User;
}
