import { createClassProvider } from '../../common';
import { IPasswordService } from './password.service';
import { ITokenService } from './token.service';
import { IUserService } from './user.service';

export const [provideUserService, InjectUserService, getUserServiceToken] =
  createClassProvider<IUserService>('UserService');

export const [
  provideRootUserService,
  InjectRootUserService,
  getRootUserServiceToken,
] = createClassProvider<IUserService>('RootUserService');

export const [
  providePasswordService,
  InjectPasswordService,
  getPasswordServiceToken,
] = createClassProvider<IPasswordService>('PasswordService');

export const [provideTokenService, InjectTokenService, getTokenServiceToken] =
  createClassProvider<ITokenService>('TokenService');
