import { IID, ITimestamp } from '../../common';
import { Range10 } from '../common';

/**
 * @param id {@link IID.id}
 * @param taskTitle {@link taskTitle}
 * @param taskDescription {@link taskDescription}
 * @param due {@link due}
 * @param status {@link status}
 * @param tags {@link Tag}
 * @param assignees {@link assignees} User
 * @param sprint {@link Sprint}
 * @param project {@link Project}
 */
export interface ITask<
  Project extends IID,
  Sprint extends IID,
  User extends IID,
  Tag extends IID
> extends IID,
    ITimestamp {
  taskTitle: string;
  taskDescription: string;
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

  sprint: Sprint;

  project: Project;
}
