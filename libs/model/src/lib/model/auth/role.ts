import { IID } from '../../common';

/**
 * User role
 * @param id {@link IID.id}
 * @param role {@link role}
 * @param permissions {@link Permission}
 */
export interface IRole<Permission> extends IID {
  role: string;
  /**
   * List of permissions
   */
  permissions: Permission[];
}
