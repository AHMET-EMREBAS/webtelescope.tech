/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '../models';
import { AuthNames } from './names';
import { Request } from 'express';
/**
 * Param Decorator
 * Get user data from the request
 */
export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as IAuthUser;
  }
);

/**
 * Param decorator
 * Get access token from the  request
 */
export const AccessToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[
      AuthNames.ACCESS_TOKEN_COOKIE_KEY
    ] as IAuthUser;
  }
);

/**
 * Append access token to the request
 * @param context
 * @param token
 */
export function setAccessToken(req: Request, token: string) {
  Object.assign(req, { [AuthNames.ACCESS_TOKEN_COOKIE_KEY]: token });
}
