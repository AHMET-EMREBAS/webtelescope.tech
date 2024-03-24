import { IID, IOwner, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param question {@link question}
 * @param owner {@link IOwner.owner} User
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IQuestion<Owner extends IID>
  extends IID,
    ITimestamp,
    IOwner<Owner> {
  /**
   * Mark-down formatted string
   */
  question: string;
}
