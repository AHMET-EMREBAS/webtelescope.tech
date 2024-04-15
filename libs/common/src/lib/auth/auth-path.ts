export type AuthPathOptions = {
  base: string;
};

export class AuthPath {
  readonly Login = this.create('login');
  readonly LoginWithCode = this.create('login-with-code');
  readonly ForgotPassWord = this.create('forgot-password');
  readonly Signup = this.create('signup');
  readonly Logout = this.create('loutout');
  readonly LogoutAll = this.create('loutout-all');
  readonly HasPermission = this.create('has-permission');
  readonly UpdatePassword = this.create('update-password');

  private create(path: string) {
    return `${this.base}/${path}`;
  }
  constructor(private readonly base: string = '') {}
}
