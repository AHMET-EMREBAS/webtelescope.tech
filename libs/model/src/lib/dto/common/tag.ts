import { ITag } from '../../model';

export interface ICreateTagDto extends Pick<ITag, 'tag'> {}
