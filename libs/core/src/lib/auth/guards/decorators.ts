import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth';
import { LocalGuard } from './local';
import { SessionGuard } from './session';
import { ByPassAuthGuard } from '../metadata';
import { SecurityCodeGuard } from './security-code';
import { UsernameGuard } from './username';
import { AuthEnums } from '../enums';

/**
 * Authenticate and authorize users
 * - Check user session is valid
 * - Check user has required permissions
 * - Check user has required roles
 * Use {@link ByPassAuthGuard} to bypass bearer guard
 * @returns
 */
export function BearerAccess() {
  return applyDecorators(ApiBearerAuth(AuthEnums.BEARER), UseGuards(AuthGuard));
}

/**
 * Basic auth
 * - Check user credentials and return bearer token
 * @returns
 */
export function CredentialAccess() {
  return applyDecorators(
    ByPassAuthGuard(),
    ApiBasicAuth(AuthEnums.BASIC),
    UseGuards(LocalGuard)
  );
}

/**
 * Session auth
 * - Check user has a valid session
 */
export function SessionAccess() {
  return applyDecorators(
    ApiBearerAuth(AuthEnums.BEARER),
    ByPassAuthGuard(),
    UseGuards(SessionGuard)
  );
}

export function SecurityCodeAccess() {
  return applyDecorators(
    ApiBasicAuth('security-code'),
    ByPassAuthGuard(),
    UseGuards(SecurityCodeGuard)
  );
}

export function UsernameAccess() {
  return applyDecorators(ByPassAuthGuard(), UseGuards(UsernameGuard));
}
