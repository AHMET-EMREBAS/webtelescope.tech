import { Module, NestConfigModule } from '@webpackages/core';
import { ConfigService } from './config.service';
import {} from '@nestjs/config';

@Module({
  imports: [NestConfigModule.forRoot({})],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
