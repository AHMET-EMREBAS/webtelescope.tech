import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/module';
import { DatabaseSeeder } from './database/db-seed';
import { DatabaseFactory } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: 'public',
      serveRoot: '',
    }),
    AuthModule,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  async onModuleInit() {
    const username = this.configService.getOrThrow('APP_USERNAME');
    const password = this.configService.getOrThrow('APP_PASSWORD');

    await DatabaseFactory.createDatabaseIFNotExist('main');
    await DatabaseSeeder.seed('main', { username, password });
  }
}
