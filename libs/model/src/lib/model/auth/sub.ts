import { ICredentials, IID } from '../../common';

/**
 * @param id {@link id}
 * @param username {@link username}
 * @param password {@link password}
 * @param subType {@link subType}
 * @param organizationName {@link organizationName}
 */
export interface ISub<SubType extends IID> extends IID, ICredentials {
  subType: SubType;
  organizationName: string;
}
