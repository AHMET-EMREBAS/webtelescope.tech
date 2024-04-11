import { DynamicModule, Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { provideHttpClientOptions } from './http-config.providers';
import { HttpClientModuleOptions } from './http-client-options';

@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {
  static configure(options: HttpClientModuleOptions): DynamicModule {
    return {
      module: HttpClientModule,
      providers: [provideHttpClientOptions(options)],
    };
  }
}
