import { IID, IOwnedEntity } from './base';

export interface IProfile<U> extends IOwnedEntity<U> {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface ICreateProfileDto
  extends Pick<
    IProfile<IID>,
    'firstName' | 'lastName' | 'middleName' | 'owner'
  > {}

export interface IUpdateProfileDto extends Partial<ICreateProfileDto> {}
