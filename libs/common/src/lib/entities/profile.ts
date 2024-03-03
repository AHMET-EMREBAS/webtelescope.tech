import { IOwnedEntity } from './base';

export interface IProfile<U> extends IOwnedEntity<U> {
  firstName: string;
  lastName: string;
  middleName: string;
}
