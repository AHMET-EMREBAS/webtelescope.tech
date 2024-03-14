import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Session, SessionRecord, SessionView } from './session.entity';
import { SessionService } from './session.service';

@Module({})
export class SessionModule {
  register(): DynamicModule {
    return {
      module: SessionModule,
      global: true,
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          entities: [Session, SessionRecord, SessionView],
          database: '.temp/session.sqlite',
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Session, SessionRecord, SessionView]),
      ],
      providers: [SessionService],
      exports: [
        SessionService,
        getRepositoryToken(Session),
        getRepositoryToken(SessionRecord),
        getRepositoryToken(SessionView),
      ],
    };
  }
}
