import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { LocalGuard } from './local.guard';

/**
 * Security Guard Decorator
 * @returns
 */
export function WithBearer() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
}

/**
 * Security Guard Decorator
 * @returns
 */
export function WithCookie() {
  return applyDecorators(ApiCookieAuth(), UseGuards(AuthGuard));
}

/**
 * Security Guard Decorator
 * @returns
 */
export function WithCredential() {
  return applyDecorators(ApiBasicAuth(), UseGuards(LocalGuard));
}
