import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  IAuthUser,
  IAuthUserService,
  provideAuthUserService,
} from '@webpackages/core';
import { Some } from '@webpackages/common';

export class UserService implements IAuthUserService {
  users: IAuthUser[] = [
    { id: 1, password: '1', username: '1', roles: [], scopes: [] },
    { id: 1, password: '1', username: '2', roles: [], scopes: [] },
    { id: 1, password: '1', username: '3', roles: [], scopes: [] },
  ];

  async findById(id: number): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.id == id);
  }
  async findByUsername(username: string): Promise<Some<IAuthUser>> {
    return this.users.find((e) => e.username === username);
  }
}

@Module({
  imports: [
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '30d' },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, provideAuthUserService(UserService)],
})
export class AppModule {}
