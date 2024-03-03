import { IID, IOwnedEntity } from './base';

export interface INotepad<O> extends IOwnedEntity<O> {
  name: string;
}

export interface ICreateNotePad extends Pick<INotepad<IID>, 'name' | 'owner'> {}

export interface IUpdateNotePad extends Partial<ICreateNotePad> {}

export interface INote<O, N> extends IOwnedEntity<O> {
  title: string;
  note: string;
  notepad: N;
}

export interface ICreateNoteDto
  extends Pick<INote<IID, IID>, 'title' | 'note' | 'notepad'> {}

export interface IUpdateNoteDto extends Partial<ICreateNoteDto> {}
