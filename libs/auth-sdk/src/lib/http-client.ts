import { Injectable } from '@nestjs/common';
import { HttpClientService } from '@webpackages/core';

import { AuthModuleHttpClientOptionsFactory } from './options.factory';

@Injectable()
export class AuthHttpClientService extends HttpClientService {
  constructor(optionsFactory: AuthModuleHttpClientOptionsFactory) {
    super(optionsFactory);
  }
}
