/* eslint-disable @typescript-eslint/no-explicit-any */
import { IID, IOwnedEntity } from './base';

export interface ISession<O> extends IOwnedEntity<O> {
  data: Record<string, any>;
}

export interface ICreateSessionDto
  extends Pick<ISession<IID>, 'data' | 'owner'> {}

export interface IUpdateSessionDto extends Partial<ICreateSessionDto> {}
