import {
  LoginDto,
  LoginResponse,
  UpdatePasswordDto,
  ForgotPasswordDto,
  LoginWithCodeDto,
  CreateSubDto,
} from '@webpackages/dto';
import {
  IOrg,
  IPermission,
  IRole,
  ISession,
  IUser,
  MessageResponse,
} from '@webpackages/model';

export interface IAuthController {
  login(
    _loginDto: LoginDto,
    accessToken: string,
    session: ISession
  ): Promise<LoginResponse>;

  logout(session: ISession): Promise<MessageResponse>;

  logoutAllDevices(session: ISession): Promise<MessageResponse>;

  hasSession(): Promise<MessageResponse>;
  updatePassword(
    session: ISession,
    passwordDto: UpdatePasswordDto
  ): Promise<void>;
  forgotPassword(
    __: ForgotPasswordDto,
    user: IUser<IOrg, IRole<IPermission>>
  ): Promise<void>;
  loginWithCode(
    __: LoginWithCodeDto,
    accessToken: string
  ): { accessToken: string };
  signup(signupDto: CreateSubDto): Promise<{ message: string }>;
}
