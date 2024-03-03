import { IID, IOwnedEntity } from './base';

export interface ISalary<U> extends IOwnedEntity<U> {
  startDate: Date;
  endDate: Date;
  type: 'hourly' | 'monthly' | 'weekly';
  salary: number;
}

export interface ICreateSalaryDto
  extends Pick<
    ISalary<IID>,
    'startDate' | 'endDate' | 'type' | 'salary' | 'owner'
  > {}
