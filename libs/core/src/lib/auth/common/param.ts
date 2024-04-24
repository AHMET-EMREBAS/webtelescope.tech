/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '../models';
import { AuthNames } from './names';

/**
 * Param Decorator
 * Get user data from the request
 */
export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as IAuthUser;
  }
);

export const AuthToken = createParamDecorator((data, context) => {
  return context.switchToHttp().getRequest()[AuthNames.BEARER_HEADER_KEY];
});
