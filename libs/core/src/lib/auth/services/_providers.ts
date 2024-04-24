import { createClassProvider } from '../../common';

export const [provideAuthUserService, InjectAuthUserService] =
  createClassProvider('AuthUserService');

export const [providePasswordService, InjectPasswordService] =
  createClassProvider('PasswordService');

export const [provideTokenService, InjectTokenService] =
  createClassProvider('TokenService');
