import { IID, IOwner, ITarget, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param answer {@link answer}
 * @param owner {@link IOwner.owner} User
 * @param target {@link ITarget.target} Question
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IAnswer<Owner extends IID, Target extends IID>
  extends IID,
    ITimestamp,
    IOwner<Owner>,
    ITarget<Target> {
  /**
   * Mark-down formatted string
   */
  answer: string;
}
