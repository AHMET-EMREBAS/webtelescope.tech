import { IID } from '../../common';
import { IResume } from '../../model';

export interface ICreateResumeDto
  extends Pick<IResume<IID>, 'resumeName' | 'user'> {}
