export interface IAuthResourceBuilder {
  Controller(): ClassDecorator;
  Login(): PropertyDecorator;
  LoginWithCode(): PropertyDecorator;
  Logout(): PropertyDecorator;
  LogoutAll(): PropertyDecorator;
  HasSession(): PropertyDecorator;
  ForgotPassword(): PropertyDecorator;
  UpdatePassword(): PropertyDecorator;
  SignUp(): PropertyDecorator;
}
