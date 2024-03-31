import { IID } from '../../common';
import { IExperience } from '../../model';

export interface ICreateExperience
  extends Pick<
    IExperience<IID, IID>,
    'startDate' | 'endDate' | 'jobTitle' | 'company'
  > {}
