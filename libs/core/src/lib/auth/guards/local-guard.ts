import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GuardHelper } from './guard-helper';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user';
import { Repository } from 'typeorm';

@Injectable()
export class LocalGuard extends GuardHelper implements CanActivate {
  constructor(
    reflector: Reflector,
    jwt: JwtService,
    @InjectRepository(User) repo: Repository<User>
  ) {
    super(reflector, jwt, repo);
  }
  async canActivate(ctx: ExecutionContext) {
    const { username, password } = this.request(ctx).body;

    if (username && password) {
      const user = await this.findUserByUsername(username);
      this.comparePassword(password, user.password);
      const token = this.signToken(user.id);
      this.appendTokenToRequest(ctx, token);
    }

    return true;
  }
}
