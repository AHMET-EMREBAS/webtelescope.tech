import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException as UE,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { GuardHelper } from './guard-helper';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, User } from '../user';
import { Repository } from 'typeorm';
import { Policy } from '../decorators';

@Injectable()
export class LocalGuard extends GuardHelper implements CanActivate {
  constructor(
    reflector: Reflector,
    jwt: JwtService,
    @InjectRepository(User) userRepo: Repository<User>,
    @InjectRepository(Session) sessionRepo: Repository<Session>
  ) {
    super(reflector, jwt, userRepo, sessionRepo);
  }

  async canActivate(ctx: ExecutionContext) {
    const req = this.request(ctx);

    const { username, password } = req.body;

    if (username && password) {
      const user = await this.userByUsername(username);
      const foundUserSession = await this.sessionByUserId(user.id);

      if (foundUserSession) {
        throw new UE('You already have a session!');
      }
      this.comparePassword(password, user.password);

      const token = await this.newSession(user);
      this.tokenToRequest(ctx, token);
    }

    return true;
  }
}

/**
 * Guard by username and password
 * @returns
 */
export function Local() {
  return applyDecorators(Policy.Public(), UseGuards(LocalGuard));
}
