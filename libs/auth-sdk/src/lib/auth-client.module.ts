import { AuthMetaService, AuthExtractService } from '@webpackages/auth';
import { DynamicModule, Module } from '@nestjs/common';
import { AuthClientService } from './auth.service';
import { AuthHttpClientService } from './services';
import { LocalGuard } from './guards';
import {
  AuthClientModuleOptions,
  AuthModuleHttpClientOptionsFactory,
  provideAuthClientModuleOptions,
  provideHttpOptions,
} from './common';

import { HttpRequestConfigFactory } from '@webpackages/http-client';

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
