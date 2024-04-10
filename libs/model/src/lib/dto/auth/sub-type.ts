import { ISubType } from '../../model';

export interface ICreateSubTypeDto
  extends Pick<ISubType, 'subname' | 'description'> {}
