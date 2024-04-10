import { IID } from '../../common';
import { ISub } from '../../model';

/**
 * Users send the information to the server to create an organization.
 * Organization is an entity that stores all subscription details
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param organizationName {@link orgname}
 * @param subType {@link subtype}
 */
export interface ICreateSubDto<SubType extends IID = IID>
  extends Pick<
    ISub<SubType>,
    'username' | 'password' | 'orgname' | 'subtype'
  > {}
