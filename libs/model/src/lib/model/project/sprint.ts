import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param sprintName {@link sprintName}
 * @param project {@link Project}
 */
export interface ISprint<Project extends IID> extends IID, ITimestamp {
  sprintName: string;
  project: Project;
}
