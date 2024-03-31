import { ICredentials, IID } from '../../common';

/**
 * Users send the information to the server to create an organization.
 * Organization is an entity that stores all subscription details
 *
 * @param id {@link IID.id}
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param organizationName {@link organizationName}
 * @param subscription {@link subscription}
 */
export interface ISignupDto extends ICredentials {
  /**
   * Unique organization name
   */
  organizationName: string;

  /**
   * Subscription type
   */
  subscription: IID;
}
