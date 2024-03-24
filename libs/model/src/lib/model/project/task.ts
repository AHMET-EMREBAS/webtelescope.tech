import { IID, ITarget, ITitleDescription } from '../../common';
import { Range10 } from '../common';

/**
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @param description {@link description}
 * @param due {@link due}
 * @param status {@link status}
 * @param tags {@link Tag}
 * @param assignees {@link assignees} User
 * @param target {@link ITarget.target} Sprint
 */
export interface ITask<Target extends IID, User extends IID, Tag extends IID>
  extends IID,
    ITitleDescription,
    ITarget<Target> {
  /**
   * Task status
   */
  status: string;

  /**
   * Task tags
   */
  tags: Tag[];

  /**
   * Task difficulty
   */
  difficulty: Range10;

  /**
   * Task priority
   */
  priority: Range10;

  /**
   * Due date
   */
  due: Date;

  /**
   * Associated users for this task
   */
  assignees: User[];
}
