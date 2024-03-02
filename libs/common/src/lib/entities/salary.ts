import { IBaseEntity } from './base';
import { IUser } from './user';

export interface ISalary extends IBaseEntity {
  startDate: Date;
  endDate: Date;
  type: 'hourly' | 'monthly' | 'weekly';
  salary: number;
  user: IUser;
}
