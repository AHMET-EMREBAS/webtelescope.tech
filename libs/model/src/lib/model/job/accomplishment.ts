import { IDescription, IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param description {@link IDescription.description}
 * @param occupation {@link Occupation}
 */
export interface IAccomplishment<Occupation> extends IID, IDescription {
  occupation: Occupation;
}
