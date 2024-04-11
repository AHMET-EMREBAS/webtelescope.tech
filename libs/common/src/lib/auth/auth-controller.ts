import {
  LoginResponse,
  UpdatePasswordDto,
  LoginWithCodeDto,
  CreateSubDto,
  UpdateResult,
  LoginDto,
  ForgotPasswordDto,
} from '@webpackages/dto';
import { ISession, IUser, MessageResponse } from '@webpackages/model';

export interface IAuthController {
  login(
    loginDto: LoginDto,
    accessToken: string,
    session: ISession
  ): Promise<LoginResponse>;
  loginWithCode(
    loginWithCodeDto: LoginWithCodeDto,
    accessToken: string,
    session: ISession
  ): Promise<LoginResponse>;
  logout(): Promise<MessageResponse>;
  logoutAll(): Promise<MessageResponse>;
  hasSession(): Promise<MessageResponse>;
  updatePassword(
    session: ISession,
    passwordDto: UpdatePasswordDto
  ): Promise<UpdateResult>;

  forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
    user: IUser
  ): Promise<MessageResponse>;

  signup(orgname: string, signupDto: CreateSubDto): Promise<MessageResponse>;
}
