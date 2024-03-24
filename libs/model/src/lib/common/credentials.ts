/**
 * This model is used for login/signin.
 * If the user is found by username,
 * then access-token is sent to the client for allowing further operation without credentials.
 *
 * @param username {@link username}
 * @param password {@link password}
 */
export interface ICredentials {
  /**
   * Username in email format. Every user must have a unique username.
   */
  username: string;

  /**
   * Password in strong-password format. Every user must have a strong password. It should contain at least an uppercase, lowercase, special character, and number. And, should be longer than or equal to 6 characters
   */
  password: string;
}
