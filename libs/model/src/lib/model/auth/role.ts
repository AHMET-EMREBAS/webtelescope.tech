import { IID, IName } from '../../common';

/**
 * User role
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @param permissions {@link Permission}
 */
export interface IRole<Permission> extends IName, IID {
  /**
   * List of permissions
   */
  permissions: Permission[];
}
