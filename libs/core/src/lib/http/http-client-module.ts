import { DynamicModule, Module } from '@nestjs/common';
import {
  HttpClientService,
  provideAxiosBaseURL,
  provideBearerToken,
  provideOrganizationName,
} from './http-client.service';

@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {
  static configure(
    baseURL: string,
    bearerToken: string,
    organizationName: string
  ): DynamicModule {
    return {
      module: HttpClientModule,
      providers: [
        provideAxiosBaseURL(baseURL),
        provideBearerToken(bearerToken),
        provideOrganizationName(organizationName),
      ],
    };
  }
}
