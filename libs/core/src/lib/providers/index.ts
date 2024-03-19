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

export function createProviders(
  prefix: string = ''
): [(value: any) => Provider, () => ParameterDecorator, () => string] {
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
  createProviders('APP_NAME');
export const [provideDomainName, InjectDomainName, getDomainNameToken] =
  createProviders('DOMAIN_NAME');
export const [provideCompanyName, InjectCompanyName, getCompanyNameToken] =
  createProviders('COMPANY_NAME');

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
