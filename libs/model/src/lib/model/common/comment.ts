import { IID, IOwner, ITarget, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param comment {@link comment}
 * @param target {@link ITarget.target} Task, Blog
 * @param owner {@link IOwner.owner} User
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IComment<Owner extends IID, Target extends IID>
  extends IID,
    ITimestamp,
    IOwner<Owner>,
    ITarget<Target> {
  comment: string;
}
