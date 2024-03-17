import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session, User } from '../user';
import { InjectRepository } from '@nestjs/typeorm';
import { GuardHelper } from './guard-helper';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionCheckerGuard extends GuardHelper implements CanActivate {
  constructor(
    reflector: Reflector,
    jwt: JwtService,
    @InjectRepository(User) userRepo: Repository<User>,
    @InjectRepository(Session) sessionRepo: Repository<Session>
  ) {
    super(reflector, jwt, userRepo, sessionRepo);
  }
  async canActivate(ctx: ExecutionContext) {
    const token = this.tokenFromRequest(this.request(ctx));

    const payload = this.verifyToken(token);

    await this.sessionById(payload.sub);

    return true;
  }
}
