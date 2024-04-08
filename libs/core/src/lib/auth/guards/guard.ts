import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth';
import { LocalGuard } from './local';
import { SessionGuard } from './session';
import { PublicAccess } from '../policy';
import { SecurityCodeGuard } from './security-code';
import { UsernameGuard } from './username';

export enum AccessPolicies {
  BEARER = 'bearer',
  BASIC = 'basic',
  X_API_KEY = 'x-apikey',
  X_ORGANIZATION = 'x-organization',
}

/**
 * Authenticate and authorize users
 * - Check user session is valid
 * - Check user has required permissions
 * - Check user has required roles
 * @returns
 */
export function BearerAccess() {
  return applyDecorators(
    ApiBearerAuth(AccessPolicies.BEARER),
    UseGuards(AuthGuard)
  );
}

/**
 * Basic auth
 * - Check user credentials and return bearer token
 * @returns
 */
export function CredentialAccess() {
  return applyDecorators(
    PublicAccess(),
    ApiBasicAuth(AccessPolicies.BASIC),
    UseGuards(LocalGuard)
  );
}

/**
 * Session auth
 * - Check user has a valid session
 */
export function SessionAccess() {
  return applyDecorators(
    ApiBearerAuth(AccessPolicies.BEARER),
    PublicAccess(),
    UseGuards(SessionGuard)
  );
}

export function SecurityCodeAccess() {
  return applyDecorators(
    ApiBasicAuth('security-code'),
    PublicAccess(),
    UseGuards(SecurityCodeGuard)
  );
}

export function UsernameAccess() {
  return applyDecorators(PublicAccess(), UseGuards(UsernameGuard));
}
