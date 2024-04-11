import { AuthEnums } from '@webpackages/common';

import { InjectAuthClientModuleOptions, InjectHttpOptions } from './providers';
import { Injectable, Optional } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AuthClientModuleOptions } from './types';
import { HttpRequestConfigFactory } from '@webpackages/http-client';
import { isDevelopment } from '@webpackages/core';

@Injectable()
export class AuthModuleHttpClientOptionsFactory
  implements HttpRequestConfigFactory
{
  constructor(
    @InjectAuthClientModuleOptions()
    private readonly moduleOptions: AuthClientModuleOptions,
    @Optional()
    @InjectHttpOptions()
    private readonly httpOptions?: HttpRequestConfigFactory
  ) {}

  options(): AxiosRequestConfig {
    const { appname, oauthApiKey, orgname } = this.moduleOptions;
    const baseURL = isDevelopment()
      ? 'http://localhost:3001'
      : 'https://auth.webtelescope.tech';

    const { headers, ...extras } = this.httpOptions?.options() || {};

    return {
      ...extras,
      baseURL,
      headers: {
        ...headers,
        [AuthEnums.X_APP_NAME]: appname,
        [AuthEnums.X_ORGNAME]: orgname,
        [AuthEnums.X_OAUTH_API_KEY]: oauthApiKey,
      },
    };
  }
}
