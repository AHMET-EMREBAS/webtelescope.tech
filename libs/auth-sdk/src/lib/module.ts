import { DynamicModule, Module } from '@nestjs/common';
import { AuthClientService } from './service';
import { LocalGuard } from './guards';
import {
  AuthMetaService,
  AuthExtractService,
  HttpRequestConfigFactory,
} from '@webpackages/core';
import { AuthHttpClientService } from './http-client';
import {
  provideAuthClientModuleOptions,
  provideHttpOptions,
} from './providers';
import { AuthClientModuleOptions } from './types';
import { AuthModuleHttpClientOptionsFactory } from './options.factory';

const providers = [
  LocalGuard,
  AuthMetaService,
  AuthExtractService,
  AuthModuleHttpClientOptionsFactory,
  AuthHttpClientService,
  AuthClientService,
];

@Module({})
export class AuthClientModule {
  static configure(
    options: AuthClientModuleOptions,
    httpOptions?: HttpRequestConfigFactory
  ): DynamicModule {
    const { ...moduleSpecificOptions } = options;
    return {
      module: AuthClientModule,
      providers: [
        provideHttpOptions(httpOptions),
        provideAuthClientModuleOptions(moduleSpecificOptions),
        ...providers,
      ],
      exports: [...providers],
    };
  }
}
