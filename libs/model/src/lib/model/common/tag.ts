import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param tag {@link tag}
 */
export interface ITag extends IID {
  tag: string;
}
