import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  InjectProfileConfigService,
  ProfileConfigService,
  ProfileModule,
  TypeOrmModule,
} from '@webpackages/core';
import { AuthModule } from '@webpackages/auth';
import { seedAppMessages as seedMessages } from './seed-messages';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/test/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectProfileConfigService() private readonly config: ProfileConfigService
  ) {}
  onModuleInit() {
    seedMessages(this.config);
  }
}
