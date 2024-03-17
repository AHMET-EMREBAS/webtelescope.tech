import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GuardHelper } from './guard-helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user';

@Injectable()
export class AuthGuard extends GuardHelper implements CanActivate {
  constructor(
    reflector: Reflector,
    jwt: JwtService,
    @InjectRepository(User) repo: Repository<User>
  ) {
    super(reflector, jwt, repo);
  }

  async canActivate(ctx: ExecutionContext) {
    if (this.isPublic(ctx)) return true;

    const req = this.request(ctx);

    const token = this.extractToken(req);

    const payload = this.verifyToken(token);

    this.isUserAuthorized(ctx);
    
    const user = await this.findUserById(payload.sub);
    

    this.appendUserToRequest(ctx, user);

    return true;
  }
}
