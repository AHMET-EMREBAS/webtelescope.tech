import { Injectable } from '@nestjs/common';
import { HttpClientService } from '@webpackages/http-client';

import { AuthModuleHttpClientOptionsFactory } from '../common';

@Injectable()
export class AuthHttpClientService extends HttpClientService {
  constructor(optionsFactory: AuthModuleHttpClientOptionsFactory) {
    super(optionsFactory);
  }
}
