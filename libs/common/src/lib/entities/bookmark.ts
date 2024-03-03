import { IID, IOwnedEntity } from './base';

export interface IBookmark<O> extends IOwnedEntity<O> {
  label: string;
  link: string;
}

export interface ICreateBookmarkDto
  extends Pick<IBookmark<IID>, 'label' | 'link' | 'owner'> {}

export interface IUpdateBookmarkDto extends Partial<ICreateBookmarkDto> {}
