import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param occupationName {@link occupationName}
 * @param industry {@link industry}
 */
export interface IJobTitle<Industry extends IID> extends IID {
  title: string;
  industry: Industry;
}
