import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GuardHelper } from './guard-helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session, User } from '../user';

@Injectable()
export class AuthGuard extends GuardHelper implements CanActivate {
  constructor(
    reflector: Reflector,
    jwt: JwtService,
    @InjectRepository(User) userRepo: Repository<User>,
    @InjectRepository(Session) sessionRepo: Repository<Session>
  ) {
    super(reflector, jwt, userRepo, sessionRepo);
  }

  async canActivate(ctx: ExecutionContext) {
    if (this.isPublic(ctx)) return true;

    const req = this.request(ctx);

    const token = this.tokenFromRequest(req);

    const payload = this.verifyToken(token);

    const existingSession = await this.sessionById(payload.sub);

    this.sessionToRequest(ctx, existingSession);

    if (this.isAdmin(ctx)) return true;

    this.isAuthorized(ctx);

    return true;
  }
}

/**
 * Secure the resource
 * @returns
 */
export function Auth() {
  return UseGuards(AuthGuard);
}
