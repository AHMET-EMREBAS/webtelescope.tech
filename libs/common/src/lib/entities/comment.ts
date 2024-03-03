import { IID, IOwnedEntity } from './base';

export interface IComment<U, O> extends IOwnedEntity<O> {
  comment: string;
  createdBy: U;
}

export interface ICreateCommentDto
  extends Pick<IComment<IID, IID>, 'comment' | 'owner' | 'createdBy'> {}

export interface IUpdateCommentDto extends Partial<ICreateCommentDto> {}

