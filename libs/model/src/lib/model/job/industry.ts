import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param name {@link INameDescription.name}
 */
export interface IIndustry extends IID {
  industryName: string;
}
