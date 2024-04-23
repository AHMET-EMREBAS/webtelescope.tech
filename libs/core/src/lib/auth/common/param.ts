import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IAuthUser } from './user';
import { AuthNames } from './names';

/**
 * Param Decorator
 * Get user data from the request
 */
export const User = createParamDecorator<ExecutionContext, IAuthUser>(
  (data: ExecutionContext) => {
    return data.switchToHttp().getRequest().user as IAuthUser;
  }
);

/**
 * Param decorator
 * Get access token from the  request
 */
export const AccessToken = createParamDecorator<ExecutionContext, IAuthUser>(
  (data: ExecutionContext) => {
    return data.switchToHttp().getRequest()[
      AuthNames.ACCESS_TOKEN_COOKIE_KEY
    ] as IAuthUser;
  }
);

/**
 * Append access token to the request
 * @param context
 * @param token
 */
export function setAccessToken(context: ExecutionContext, token: string) {
  context.switchToHttp().getRequest()[AuthNames.ACCESS_TOKEN_COOKIE_KEY] =
    token;
}
