import { IProject } from '../../model';

export interface ICreateProjectDto extends Pick<IProject, 'projectName'> {}
