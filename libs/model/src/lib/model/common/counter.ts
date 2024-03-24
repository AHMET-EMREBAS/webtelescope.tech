import { IID, IOwner, ITarget } from '../../common';

/**
 * Counter entity extends this interface. The interface does not have any interactive property.
 * Whenever you need to count a specific user interactivity such as like, dislike, score, then use this interface
 * @param id {@link IID.id}
 * @param owner {@link IOwner.owner} User
 * @param target {@link ITarget.target} Product, Blog, Comment, Question
 */
export interface ICounter<Owner extends IID, Target extends IID>
  extends IID,
    IOwner<Owner>,
    ITarget<Target> {}
