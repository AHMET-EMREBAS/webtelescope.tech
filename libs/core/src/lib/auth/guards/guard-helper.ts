/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Policy, USER_SESSION_NAME } from '../decorators';
import {
  ExecutionContext as EC,
  UnauthorizedException as UA,
} from '@nestjs/common';
import { Session, User } from '../user';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';

export abstract class GuardHelper {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
    protected readonly userRepo: Repository<User>,
    protected readonly sessionRepo: Repository<Session>
  ) {}

  /**
   * Verify token
   * @param token
   * @returns
   */
  protected verifyToken(token: string): { sub: number } {
    try {
      return this.jwt.verify(token);
    } catch (err) {
      throw new UA('Invalid token');
    }
  }

  protected __tokenFromRequest(req: Request): string | undefined {
    const [, token] = req.headers.authorization?.split(' ') ?? [];
    return token;
  }
  /**
   * Extract bearer tokenn from authorization header.
   * @param req
   * @returns
   */
  protected tokenFromRequest(req: Request): string | never {
    const token = this.__tokenFromRequest(req);
    if (token) {
      return token;
    } else {
      throw new UA('Access token is not provided');
    }
  }

  protected __sessionFromRequest(ctx: EC): Session | undefined {
    return ctx.switchToHttp().getRequest()[USER_SESSION_NAME];
  }
  /**
   * Extract session value from request
   * @param ctx
   * @returns
   */
  protected sessionFromRequest(ctx: EC): Session | never {
    const userSession = this.__sessionFromRequest(ctx);
    if (userSession) return userSession;
    throw new UA('Not extracted session');
  }

  /**
   * Get required permissions
   * @param ctx
   * @returns
   */
  protected permissionsMeta(ctx: EC) {
    return this.reflector.getAllAndMerge(Policy.PERMISSION_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  /**
   * Get required roles
   * @param ctx
   * @returns
   */
  protected rolesMeta(ctx: EC) {
    return this.reflector.getAllAndMerge(Policy.ROLE_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  /**
   * Check the source is public or not
   * @param ctx
   * @returns
   */
  protected isPublic(ctx: EC) {
    return !!this.reflector.getAllAndOverride(Policy.PUBLIC_METADATA_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  /**
   * Write session to request
   * @param ctx
   * @param session
   */
  protected sessionToRequest(ctx: EC, session: Session) {
    ctx.switchToHttp().getRequest()[USER_SESSION_NAME] = session;
  }

  /**
   * Compare user password
   * @param password
   * @param hashValue
   * @returns
   */
  protected async comparePassword(password: string, hashValue: string) {
    if (compareSync(password, hashValue)) {
      return true;
    }

    throw new UA('Wrong password');
  }

  /**
   * Find user by id
   * @param id
   * @returns
   */
  protected async userById(id: number): Promise<User> | never {
    try {
      return await this.userRepo.findOneByOrFail({ id });
    } catch (err) {
      throw new UA('User not found');
    }
  }

  /**
   * Find user by username
   * @param username
   * @returns
   */
  protected async userByUsername(username: string): Promise<User> | never {
    const found = await this.userRepo.findOneBy({ username });
    if (found) {
      return found;
    }
    throw new UA('User not found!');
  }

  /**
   * Find session by id
   * @param id
   * @returns
   */
  protected async sessionById(id: number): Promise<Session> | never {
    try {
      return await this.sessionRepo.findOneByOrFail({ id });
    } catch (err) {
      throw new UA(`Session not found`);
    }
  }

  /**
   * Find session by user-id
   * @param userId
   * @returns
   */
  protected async sessionByUserId(userId: number): Promise<Session> | never {
    const foundSession = await this.sessionRepo.findOneBy({ userId });

    if (foundSession) {
      return foundSession;
    }

    throw new UA('Session not found');
  }

  /**
   * Create a new session, sign token, and return token
   * @param user
   * @returns
   */
  protected async newSession(user: User): Promise<string> | never {
    const session = await this.sessionRepo.save({
      userId: user.id,
      user,
      token: '',
    });
    const token = this.signToken(session.id);
    await this.sessionRepo.update(session.id, { token });

    return token;
  }

  /**
   * Http request instance
   * @param ctx
   * @returns
   */
  protected request(ctx: EC): Request {
    return ctx.switchToHttp().getRequest() as Request;
  }

  /**
   * Check user has admin role.
   * @param ctx
   * @returns
   */
  protected isAdmin(ctx: EC) {
    const { user } = this.sessionFromRequest(ctx);

    if (user?.roles?.find((e) => e.name === 'admin')) {
      return true;
    }
    return false;
  }

  /**
   * Check user have required permissions and roles
   * @param ctx
   */
  protected isAuthorized(ctx: EC) {
    const permissions = this.permissionsMeta(ctx);
    const roles = this.rolesMeta(ctx);
    const { user } = this.sessionFromRequest(ctx);

    for (const r of roles) {
      if (!user.roles.find((e) => e.name === r)) {
        throw new UA('You are not authorized for this operation!');
      }
    }

    for (const p of permissions) {
      if (!user.roles.find((e) => e.permissions.find((k) => k.name === p))) {
        throw new UA('You are not authorized for this operation');
      }
    }
  }

  /**
   * Sign session token
   * @param sub
   * @returns
   */
  signToken(sub: number) {
    return this.jwt.sign({ sub });
  }

  /**
   * Write bearer token to http request
   * @param ctx
   * @param token
   */
  tokenToRequest(ctx: EC, token: string) {
    const req = this.request(ctx);
    (req as any)[Policy.BEARER_AUTH_NAME] = token;
  }
}
