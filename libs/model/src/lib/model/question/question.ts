import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param question {@link question}
 * @param user {@link User} User
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IQuestion<User extends IID> extends IID, ITimestamp {
  /**
   * Mark-down formatted string
   */
  question: string;

  user: User;
}
