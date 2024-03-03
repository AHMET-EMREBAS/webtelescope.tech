import { IOwnedEntity } from './base';

export interface IRecord<T> extends IOwnedEntity<T> {
  record: Record<string, string>;
}
