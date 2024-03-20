/* eslint-disable @typescript-eslint/no-explicit-any */
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, Session, SecurityCode, User } from './user';
import { AuthService } from './service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard, LocalGuard, SessionGuard } from './guards';
import { Repository } from 'typeorm';

const entities = [User, Role, Permission, Session, SecurityCode];

@Global()
@Module({
  imports: [
    EventEmitterModule,
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      global: true,
      secret: process.env['SECRET'] || 'SECRET',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, LocalGuard, SessionGuard],
  exports: [
    JwtModule,
    AuthService,
    AuthGuard,
    LocalGuard,
    SessionGuard,
    TypeOrmModule.forFeature(entities),
  ],
})
export class AuthModule {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    repo
      .save({ username: 'aemrebas.dev@gmail.com', password: '!Password1' })
      .then();
  }
}
