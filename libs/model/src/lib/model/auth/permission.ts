import { IID, IName } from '../../common';

/**
 * User permission
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 */
export interface IPermission extends IName, IID {}
