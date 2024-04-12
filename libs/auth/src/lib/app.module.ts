import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseFactory, getDatabaseName } from './database';
import { AuthModule } from './auth';
import { key } from './common';

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

    const username = this.configService.getOrThrow(key('USERNAME'));
    const password = this.configService.getOrThrow(key('PASSWORD'));

    const dbname = this.configService.getOrThrow(key('DATABASE_NAME'));

    if (!DatabaseFactory.isDatabaseExist(getDatabaseName(dbname))) {
      await DatabaseFactory.createDatabaseIFNotExist(dbname);

      try {
        await DatabaseFactory.updateTemplateDatabaseForUser(
          dbname,
          username,
          password
        );
      } catch (err) {
        this.logger.debug(
          'Could not not update user and organization in the new database.'
        );
      }
    }
  }
}
