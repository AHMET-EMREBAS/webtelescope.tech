import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param category {@link category}
 */
export interface ICategory extends IID {
  category: string;
}
