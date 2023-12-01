export class AuthEvents {
  static LOGIN = Symbol('login event');
  static LOGOUT = Symbol('logout event');
  static SIGNUP = Symbol('signup event');
  static FORGOT_PASSWORD = Symbol('forgot password event');
}
