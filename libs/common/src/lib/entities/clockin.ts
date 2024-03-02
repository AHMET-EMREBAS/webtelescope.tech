import { IBaseEntity } from './base';

export interface IClockIn extends IBaseEntity {
  start: Date;
  end: Date;
}
