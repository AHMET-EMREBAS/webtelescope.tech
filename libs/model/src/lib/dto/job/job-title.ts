import { IID } from '../../common';
import { IJobTitle } from '../../model';

export interface ICreateJobTitleDto
  extends Pick<IJobTitle<IID>, 'title' | 'industry'> {}
