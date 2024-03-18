export class AuthEnums {
  static readonly BEARER = 'bearer_auth';
  static readonly BASIC = 'basic_auth';
  static readonly PUBLIC = Symbol('PUBLIC');
  static readonly PERMISSION = Symbol('PERMISSION');
  static readonly ROLE = Symbol('ROLE');
  static readonly SESSION = Symbol('SESSION');
}
