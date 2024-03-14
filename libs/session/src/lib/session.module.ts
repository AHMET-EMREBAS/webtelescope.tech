import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';

@Module({})
export class SessionModule {
  register(): DynamicModule {
    return {
      module: SessionModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          entities: [Session],
          database: '.temp/session.sqlite',
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Session]),
      ],
    };
  }
}
