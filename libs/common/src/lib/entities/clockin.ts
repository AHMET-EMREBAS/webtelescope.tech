import { IID, IOwnedEntity } from './base';

export interface IClockIn<U> extends IOwnedEntity<U> {
  start: Date;
  end: Date;
}

export interface ICreateClockInDto
  extends Pick<IClockIn<IID>, 'start' | 'end' | 'owner'> {}

export interface IUpdateClockInDto extends Partial<ICreateClockInDto> {}
