import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param answer {@link answer}
 * @param user {@link User} User
 * @param question {@link Question} Question
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IAnswer<User extends IID, Question extends IID>
  extends IID,
    ITimestamp {
  /**
   * Mark-down formatted string
   */
  answer: string;

  user: User;

  question: Question;
}
