/* eslint-disable @typescript-eslint/no-explicit-any */
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, Session, User } from './user';
import { AuthService } from './service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, Session]),
    JwtModule.register({
      global: true,
      secret: process.env['SECRET'] || 'SECRET',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    JwtModule,
    AuthService,
    TypeOrmModule.forFeature([User, Role, Permission, Session]),
  ],
})
export class AuthModule {}
