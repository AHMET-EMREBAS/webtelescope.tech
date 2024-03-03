import { IID, IOwnedEntity } from './base';

export interface IRecord<T> extends IOwnedEntity<T> {
  record: Record<string, string>;
}

export interface ICreateRecordDto
  extends Pick<IRecord<IID>, 'owner' | 'record'> {}

export interface IUpdateRecordDto extends Partial<ICreateRecordDto> {}

