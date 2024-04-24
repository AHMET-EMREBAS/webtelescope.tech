import { createClassProvider } from '../../common';
import { IPasswordService } from './password.service';
import { ITokenService } from './token.service';
import { IAuthUserService } from './user.service';

export const [provideAuthUserService, InjectAuthUserService] =
  createClassProvider<IAuthUserService>('AuthUserService');

export const [providePasswordService, InjectPasswordService] =
  createClassProvider<IPasswordService>('PasswordService');

export const [provideTokenService, InjectTokenService] =
  createClassProvider<ITokenService>('TokenService');
