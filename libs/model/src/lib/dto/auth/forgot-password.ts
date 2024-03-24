import { ICredentials } from './credentials';

/**
 * User should send this information to the server to request a password reset link/code or any means of password recovery.
 *
 * @param username {@link ICredentials.username}
 */
export interface IForgotPassword extends Pick<ICredentials, 'username'> {}
