import { IID } from '../../common';
import { IAccomplishment } from '../../model';

export interface ICreateAccomplishementDto
  extends Pick<IAccomplishment<IID>, 'jobTitle' | 'description'> {}
