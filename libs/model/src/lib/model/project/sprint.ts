import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param sprintName {@link sprintName}
 * @param project {@link Project}
 */
export interface ISprint<Project extends IID> extends IID {
  sprintName: string;
  project: Project;
}
