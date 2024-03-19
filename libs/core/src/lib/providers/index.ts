/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Provider } from '@nestjs/common';
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
