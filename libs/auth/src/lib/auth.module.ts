import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Role,
  Permission,
  Session,
  SessionRecord,
  SessionView,
  Subscription,
} from '@webpackages/entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { SessionService } from './session.service';

const entities = [
  Subscription,
  User,
  Role,
  Permission,
  Session,
  SessionRecord,
  SessionView,
];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['SECRET'] || v4(),
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/auth.sqlite',
      entities: [...entities],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [AuthController],
  providers: [SessionService],
})
export class AuthModule {}
