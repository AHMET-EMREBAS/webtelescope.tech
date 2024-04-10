import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseFactoryService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    console.log(this.config.get('DB_NAME'));
    return {
      name: connectionName,
      type: 'better-sqlite3',
      database: this.config.get('DB_NAME'),
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      extraProviders: [ConfigService],
      useClass: DatabaseFactoryService,
    }),
  ],
})
export class AppModule {}
