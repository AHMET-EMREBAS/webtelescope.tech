import { ICredentials } from './credentials';

/**
 * Users send the information to the server to get the access-token.
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 */
export interface ILogin extends ICredentials {}
