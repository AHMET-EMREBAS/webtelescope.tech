/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext } from '@nestjs/common';
import { AuthNames } from './names';
import { Some } from '@webpackages/common';
import { IAuthUser } from '../models/user';
import { Request } from 'express';

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
    return context.switchToHttp().getRequest<Request>().cookies?.[key];
  };
}

export const extractBearerApiKey = (context: ExecutionContext) => {
  return context
    .switchToHttp()
    .getRequest<Request>()
    .headers.authorization?.split(' ')
    .pop();
};

/**
 * Extract orgname from the request headers
 */
export const extractOrgname = createHeaderExtractor(
  AuthNames.ORGNAME_HEADER_KEY
);

/**
 * Extract user from the request F
 * @param context
 * @returns
 */
export const extractUser = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user as Some<IAuthUser>;
};

/**
 * Extract auth cookie from cookies
 */
export const extractAuthCookie = createCookieExtractor(
  AuthNames.ACCESS_TOKEN_COOKIE_KEY
);

/**
 * Extract body from the request
 * @param context
 * @returns
 */
export const extractBody = (req: Request) => {
  return req.body;
};
