import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthNames } from '../common/names';
import { AuthGuard } from './auth.guard';
import { LocalGuard } from './local.guard';

/**
 * Security Guard Decorator
 * @returns
 */
export function ApiKeyAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.API_KEY_SECURITY_NAME),
    UseGuards(AuthGuard)
  );
}

/**
 * Security Guard Decorator
 * @returns
 */
export function CookieAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.COOKIE_SECURITY_NAME),
    UseGuards(AuthGuard)
  );
}

/**
 * Security Guard Decorator
 * @returns
 */
export function CredentialsAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.CREDENTIALS_SECURITY_NAME),
    UseGuards(LocalGuard)
  );
}
