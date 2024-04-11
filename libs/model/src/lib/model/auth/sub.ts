import { ICredentials, IID } from '../../common';

/**
 * @param id {@link id}
 * @param username {@link username}
 * @param password {@link password}
 * @param subType {@link subtype}
 * @param organizationName {@link orgname}
 */
export interface ISub<SubType extends IID> extends IID, ICredentials {
  orgname: string;
  subtype?: SubType;
}
