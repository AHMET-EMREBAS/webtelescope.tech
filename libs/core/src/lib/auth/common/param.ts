/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthNames } from './names';
import { IUser } from '@webpackages/common';

/**
 * Param Decorator
 * Get user data from the request
 */
export const UserParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as IUser;
  }
);

export const AuthToken = createParamDecorator((data, context) => {
  return context.switchToHttp().getRequest()[AuthNames.BEARER_HEADER];
});
