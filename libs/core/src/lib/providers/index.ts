/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CustomDecorator,
  ExecutionContext,
  Inject,
  Provider,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { v4 } from 'uuid';

/**
 * Create provider, inject function, and getToken function.
 * @param tokenPrefix Token prefix
 * @returns [ provideFn, injectFn, getTokenFn ]
 */
export function createProvider<T>(
  prefix: string
): [(value?: T) => Provider<T>, () => ParameterDecorator, () => string] {
  const token = prefix + v4();

  return [
    function provideIt(useValue: any): Provider {
      return {
        provide: token,
        useValue,
      };
    },
    function injectIt() {
      return Inject(token);
    },
    () => token,
  ];
}

export const [provideAppName, InjectAppName, getAppNameToken] =
  createProvider('APP_NAME');
export const [provideDomainName, InjectDomainName, getDomainNameToken] =
  createProvider('DOMAIN_NAME');
export const [provideCompanyName, InjectCompanyName, getCompanyNameToken] =
  createProvider('COMPANY_NAME');
export const [provideJWTSecret, InjectSecret, getSecretToken] =
  createProvider('JWT_SECRET');

export function createMetadata(
  override = true
): [
  (value?: any) => CustomDecorator<any>,
  (reflector: Reflector, ctx: ExecutionContext) => any
] {
  const token: string = v4();
  return [
    function set(value?: any) {
      return SetMetadata(token, value !== undefined ? value : true);
    },

    function get(reflector: Reflector, ctx: ExecutionContext) {
      if (override) {
        return reflector.getAllAndOverride(token, [
          ctx.getClass(),
          ctx.getHandler(),
        ]);
      } else {
        return reflector.getAllAndMerge(token, [
          ctx.getClass(),
          ctx.getHandler(),
        ]);
      }
    },
  ];
}
