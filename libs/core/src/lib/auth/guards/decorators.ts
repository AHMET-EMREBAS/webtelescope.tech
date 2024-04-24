import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthNames } from '../common/names';
import { AuthGuard } from './auth.guard';
import { LocalGuard } from './local.guard';

/**
 * Security Guard Decorator
 * @returns
 */
export function WithApiKey() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.API_KEY_SECURITY_NAME),
    UseGuards(AuthGuard)
  );
}

/**
 * Security Guard Decorator
 * @returns
 */
export function WithCookie() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.COOKIE_SECURITY_NAME),
    UseGuards(AuthGuard)
  );
}

/**
 * Security Guard Decorator
 * @returns
 */
export function WithCredential() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.CREDENTIALS_SECURITY_NAME),
    UseGuards(LocalGuard)
  );
}
