import { IBasicEntity, IID, IOwnedEntity } from './base';

export interface IProject extends IBasicEntity {
  name: string;
  description: string;
}

export interface ICreateProjectDto
  extends Pick<IProject, 'name' | 'description'> {}

export interface IUpdateProjectDto extends Partial<ICreateProjectDto> {}

export interface ITask<C, U, S> extends IOwnedEntity<S> {
  name: string;
  description: string;
  due: Date;
  asignee: U[];
  category: C;
  status: string;
}

export interface ICreateTaskDto
  extends Pick<
    ITask<IID, IID, IID>,
    'name' | 'description' | 'due' | 'asignee' | 'category' | 'owner'
  > {}

export interface IUpdateTaskDto extends Partial<ICreateTaskDto> {}

export interface ISprint<O> extends IOwnedEntity<O> {
  name: string;
  description: string;
  due: Date;
}

export interface ICreateSprintDto
  extends Pick<ISprint<IID>, 'name' | 'description' | 'due' | 'owner'> {}

export interface IUpdateSprintDto extends Partial<ICreateSprintDto> {}

