import { ICredentials } from '../../common';

/**
 * User should send this information to the server to request a password reset link/code or any means of password recovery.
 *
 * @param username {@link ICredentials.username}
 */
export interface IForgotPasswordDto extends Pick<ICredentials, 'username'> {}
