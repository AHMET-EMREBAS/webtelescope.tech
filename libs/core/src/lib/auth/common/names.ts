export enum AuthNames {
  ORGNAME_HEADER_KEY = 'x-orgname',

  /**
   * Api keys will be stored in the `autorization` in headers.
   */
  BEARER_HEADER_KEY = 'authorization',

  /**
   * Api keys will be stored in the `autorization` in headers.
   */
  OAUTH2_KEY = 'x-apikey',

  /**
   * Name of the api-key security schema. In this secuirty procees, users must provide an `authorization` header.
   * Otherwise, users are not authorized for any operations.
   */
  BEARER_SECURITY_NAME = 'Berar',

  /**
   * For third party subscribers
   */
  OAUTH2_NAME = 'Api Key',

  /**
   * Name of the credentials security schema. In this security process, users must provide valid and verified username and password.
   * If user is found and the password matches with the entry in the database, then the user is autorized for the operation.
   */
  CREDENTIALS_SECURITY_NAME = 'Credentials',

  /**
   * Name of the cookie security schema. In this security schema, users must provide a cookie named as `accesstoken` to be autorized for the operations
   * When users successfully login, then the `accesstoken` cookie is provided to the users.
   */
  COOKIE_SECURITY_NAME = 'Cookie auth',

  /**
   * Name of the cookie for cookie security schema. `accesstoken`
   */
  ACCESS_TOKEN_COOKIE_KEY = 'accesstoken',
}
