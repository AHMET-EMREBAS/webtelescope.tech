import { ICreateSessionDto, IUser } from '@webpackages/model';
import { v4 } from 'uuid';

/**
 * Convert user data into session data
 * @param user
 * @returns
 */
export function userToSession(user: IUser): ICreateSessionDto {
  const userPermissions =
    user.roles.map((e) => e.permissions.map((p) => p.permission)).flat() || [];
  const userRoles = user.roles.map((e) => e.role);
  return {
    deviceId: v4(),
    permissions: userPermissions,
    roles: userRoles,
    userId: user.id,
    orgId: user.organization.id,
    orgname: user.organization.orgname,
  };
}
