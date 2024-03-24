import { ICredentials } from './credentials';

/**
 * After forgot-password request, a security code is sent to the user.
 * User should send the information to the server to get access token.
 * @param username {@link ICredentials.username}
 * @param securityCode {@link securityCode}
 */
export interface ILoginWithCode extends Pick<ICredentials, 'username'> {
  /**
   * Uniquely generated security code. The code is used only once. New code is generated upon every forgot-password request.
   */
  securityCode: string;
}
