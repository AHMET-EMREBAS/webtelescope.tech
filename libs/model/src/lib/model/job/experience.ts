import { IID, ITarget } from '../../common';

export interface IExperience<Occupation, Accomplishment, Target>
  extends IID,
    ITarget<Target> {
  
  
  occupation: Occupation;
  
  startDate: Date;
  
  endDate: Date;
  
  accomplishements: Accomplishment[];
  
}
