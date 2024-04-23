/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthNames } from '.';
import { Some } from '@webpackages/common';
import { IAuthUser } from './auth-user';

export function createHeaderExtractor<Request extends { headers: any }>(
  key: string
) {
  return (context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().headers[key];
  };
}

export function createCookieExtractor<Request extends { cookies: any }>(
  key: string
) {
  return (context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().cookies[key];
  };
}

export const extractApiKey = createHeaderExtractor(
  AuthNames.AUTHORIZATION_HEADER
);

export const extractOrgname = createHeaderExtractor(
  AuthNames.ORGNAME_HEADER_NAME
);

export const extractUser = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user as Some<IAuthUser>;
};

export const extractAuthCookie = createCookieExtractor(
  AuthNames.ACCESS_TOKEN_COOKIE_NAME
);

export const User = createParamDecorator((data: unknown, input: any) => {
  console.log(data);
  throw new Error('Not implemented!');
});
