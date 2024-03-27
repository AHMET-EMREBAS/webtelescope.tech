import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param occupationName {@link occupationName}
 * @param industry {@link industry}
 */
export interface IOccupation<Industry extends IID> extends IID {
  occupationName: string;
  industry: Industry;
}
