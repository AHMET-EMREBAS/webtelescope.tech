import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/module';

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
    const logger = new Logger('On AppModule Init');

    await DatabaseFactory.createDatabaseTemplate();

    const username = this.configService.getOrThrow('APP_USERNAME');
    const password = this.configService.getOrThrow('APP_PASSWORD');

    logger.log('username and password are read from configuration.');

    await DatabaseFactory.createDatabaseIFNotExist('main');
    logger.log('Createad main database');

    try {
      await DatabaseFactory.updateTemplateDatabaseForUser(
        'main',
        username,
        password
      );
      logger.log('Updated the user and organization in the new database');
    } catch (err) {
      console.error(err);
      logger.error(
        'Could not not update user and organization in the new database.'
      );
    }
  }
}
