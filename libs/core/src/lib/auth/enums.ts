export class AuthEnums {
  static readonly BEARER = 'bearer_auth';
  static readonly BASIC = 'basic_auth';
  static readonly SESSION = Symbol('SESSION');
  static readonly USER = Symbol('USER');
}
