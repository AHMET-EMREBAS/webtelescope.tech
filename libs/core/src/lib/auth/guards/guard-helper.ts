/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Policy } from '../decorators';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../user';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';

export abstract class GuardHelper {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
    protected readonly repo: Repository<User>
  ) {}

  protected verifyToken(token: string): { sub: number } {
    try {
      return this.jwt.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token!');
    }
  }

  protected extractToken(req: Request): string | never {
    const [, token] = req.headers.authorization?.split(' ') ?? [];
    if (token) {
      return token;
    } else {
      throw new UnauthorizedException('You do not have a valid session!');
    }
  }

  protected permissions(ctx: ExecutionContext) {
    return this.reflector.getAllAndMerge(Policy.PERMISSION_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  protected roles(ctx: ExecutionContext) {
    return this.reflector.getAllAndMerge(Policy.ROLE_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  protected userEntity(ctx: ExecutionContext): User | never {
    const user = ctx.switchToHttp().getRequest().user;
    if (user) return user;
    throw new UnauthorizedException('User information is not foudn!');
  }

  protected isPublic(ctx: ExecutionContext) {
    return !!this.reflector.getAllAndOverride(Policy.PUBLIC_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  protected appendUserToRequest(ctx: ExecutionContext, user: User) {
    ctx.switchToHttp().getRequest()['user'] = user;
  }

  protected async findUserByUsername(username: string): Promise<User> | never {
    const found = await this.repo.findOneBy({ username });
    if (found) {
      return found;
    }
    throw new UnauthorizedException('User not found!');
  }

  protected async comparePassword(password: string, hashValue: string) {
    if (compareSync(password, hashValue)) {
      return true;
    }

    throw new UnauthorizedException('Wrong password!');
  }
  protected async findUserById(id: number): Promise<User> | never {
    try {
      return await this.repo.findOneByOrFail({ id });
    } catch (err) {
      throw new UnauthorizedException('User not found');
    }
  }

  protected request(ctx: ExecutionContext): Request {
    return ctx.switchToHttp().getRequest() as Request;
  }

  protected isUserAuthorized(ctx: ExecutionContext) {
    const permissions = this.permissions(ctx);
    const roles = this.roles(ctx);
    const user = this.userEntity(ctx);

    for (const r of roles) {
      if (!user.roles.find((e) => e.name === r)) {
        throw new UnauthorizedException(
          'You are not authorized for this operation!'
        );
      }
    }

    for (const p of permissions) {
      if (!user.roles.find((e) => e.permissions.find((k) => k.name === p))) {
        throw new UnauthorizedException(
          'You are not authorized for this operation!'
        );
      }
    }
  }

  signToken(sub: number) {
    return this.jwt.sign({ sub });
  }

  appendTokenToRequest(ctx: ExecutionContext, token: string) {
    const req = this.request(ctx);
    (req as any)[Policy.ACCESS_TOKEN_NAME] = token;
    
  }
}
