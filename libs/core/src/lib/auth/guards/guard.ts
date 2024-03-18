import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AuthEnums } from '../enums';
import { AuthGuard } from './auth';
import { LocalGuard } from './local';
import { SessionGuard } from './session';
import { PublicAccess } from '../policy';

/**
 * Authenticate and authorize users
 * - Check user session is valid
 * - Check user has required permissions
 * - Check user has required roles
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
    PublicAccess(),
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
    UseGuards(SessionGuard)
  );
}
