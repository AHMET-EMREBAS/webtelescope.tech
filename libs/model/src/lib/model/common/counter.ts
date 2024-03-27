import { IID } from '../../common';

/**
 * Counter entity extends this interface. The interface does not have any interactive property.
 * Whenever you need to count a specific user interactivity such as like, dislike, score, then use this interface
 * @param id {@link IID.id}
 * @param user {@link user} User
 * @param target {@link Target} Product, Blog, Comment, Question
 */
export interface ICounter<User extends IID, Target extends IID> extends IID {
  /**
   * The initiator of the counter. For example, considering a like counter,
   * this is the user who clicked the like button.
   */
  user: User;

  /**
   * Associated target entity. For example, considering a like counter,
   * this is the associate content entity that user liked.
   */
  target: Target;
}
