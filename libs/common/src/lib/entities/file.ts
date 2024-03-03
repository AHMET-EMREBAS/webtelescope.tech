import { IID, IOwnedEntity } from './base';

export interface IFile<U> extends IOwnedEntity<U> {
  description: string;
  name: string;
  type: string;
  uri: string;
}

export interface ICreateFileDto
  extends Pick<IFile<IID>, 'description' | 'name' | 'type' | 'uri' | 'owner'> {}

export interface IUpdateFileDto extends Partial<ICreateFileDto> {}
