import { IID } from '../../common';

/**
 * User permission
 * @param id {@link IID.id}
 * @param permission {@link permission}
 */
export interface IPermission extends IID {
  permission: string;
}
