import { IID } from '../../common';

/**
 * Counter entity extends this interface. The interface does not have any interactive property.
 * Whenever you need to count a specific user interactivity such as like, dislike, score, then use this interface
 * @param id {@link IID.id}
 * @param user {@link user} User
 * @param target {@link Target} Product, Blog, Comment, Question
 */
export interface ICounter<User extends IID, Target extends IID> extends IID {
  user: User;
  target: Target;
}
