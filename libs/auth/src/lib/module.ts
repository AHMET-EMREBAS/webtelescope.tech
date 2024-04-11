import { Logger, Module, OnModuleInit } from '@nestjs/common';
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
export class AppModule implements OnModuleInit {
  private readonly logger!: Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(AppModule.name);
  }
  async onModuleInit() {
    await DatabaseFactory.createDatabaseTemplate();

    const username = this.configService.getOrThrow('APP_USERNAME');
    const password = this.configService.getOrThrow('APP_PASSWORD');

    await DatabaseFactory.createDatabaseIFNotExist('main');

    try {
      await DatabaseFactory.updateTemplateDatabaseForUser(
        'main',
        username,
        password
      );
    } catch (err) {
      console.error(err);
      this.logger.debug(
        'Could not not update user and organization in the new database.'
      );
    }
  }
}
