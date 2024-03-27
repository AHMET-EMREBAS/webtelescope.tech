import { IID } from '../../common';
import { ISprint } from '../../model';

export interface ICrateSprintDto
  extends Pick<ISprint<IID>, 'project' | 'sprintName'> {}
