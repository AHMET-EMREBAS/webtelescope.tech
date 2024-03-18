import { InjectRepository } from '@nestjs/typeorm';
import { Session, SessionPayload, User } from './user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { compareSync } from 'bcrypt';
import { AuthEnums } from './enums';

export class AuthService {
  constructor(
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectRepository(Session)
    protected readonly sessionRepo: Repository<Session>,
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService
  ) {}

  findUserByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async findUserByUserNameOrThrow(username: string) {
    const found = await this.findUserByUsername(username);
    if (found) return found;
    throw new UnauthorizedException('User not found!');
  }

  comparePassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  comparePasswordOrThrow(password: string, hashPassword: string) {
    if (this.comparePassword(password, hashPassword)) return true;

    throw new UnauthorizedException('Wrong password');
  }

  findSessionById(sessionId: number) {
    return this.sessionRepo.findOneBy({ id: sessionId });
  }

  async findSessionByIdOrThrow(sessionId: number): Promise<Session> | never {
    const found = await this.findSessionById(sessionId);
    if (found) return found;
    throw new UnauthorizedException('Session not found!');
  }

  async createNewSession(user: User) {
    const { id: userId, roles: userRoles } = user;

    const roles = userRoles.map((e) => e.name);
    const permissions = userRoles
      .map((e) => e.permissions.map((e) => e.name))
      .flat();

    return await this.sessionRepo.save({ userId, roles, permissions });
  }

  async deleteSession(sessionId: number) {
    return await this.sessionRepo.delete(sessionId);
  }

  async findSessionsByUserId(userId: number) {
    return await this.sessionRepo.find({ where: { userId } });
  }

  async deleteAllSessionsByUserId(userId: number) {
    return await this.sessionRepo.delete({ userId });
  }

  signToken(session: Session) {
    return this.jwt.sign({ sub: session.id });
  }

  verifyToken(token: string): SessionPayload {
    try {
      return this.jwt.verify<SessionPayload>(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  extractToken(ctx: ExecutionContext) {
    const bearerToken = this.request(ctx).headers.authorization ?? undefined;
    const [, token] = bearerToken?.split(' ') ?? [];
    return token;
  }

  extractTokenOrThrow(ctx: ExecutionContext) {
    const token = this.extractToken(ctx);
    if (token) return token;
    throw new UnauthorizedException('You do not have a session!');
  }

  appendAuthorizationToken(ctx: ExecutionContext, token: string) {
    this.request(ctx).headers.authorization = token;
  }

  extractUsernameAndPassworFromBody(ctx: ExecutionContext) {
    const { username, password } = this.request(ctx).body;
    if (username && password) return { username, password };
    return undefined;
  }
  extractUsernameAndPassworFromBodyThrow(ctx: ExecutionContext) {
    const credentials = this.extractUsernameAndPassworFromBody(ctx);
    if (credentials) return credentials;
    throw new UnauthorizedException('Username or password is not provided');
  }

  request(ctx: ExecutionContext): Request {
    return ctx.switchToHttp().getRequest() as Request;
  }

  getAllAndOverride(ctx: ExecutionContext, key: string | symbol) {
    return this.reflector.getAllAndOverride(key, [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
  }

  getAllAndMerge(ctx: ExecutionContext, key: string | symbol) {
    return this.reflector.getAllAndMerge(key, [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
  }

  isPublic(ctx: ExecutionContext) {
    return this.getAllAndOverride(ctx, AuthEnums.PUBLIC);
  }

  requiredPermissions(ctx: ExecutionContext) {
    return this.reflector.getAllAndMerge(AuthEnums.PERMISSION, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  requiredRoles(ctx: ExecutionContext) {
    return this.reflector.getAllAndMerge(AuthEnums.ROLE, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  userHasPermissions(userPermissions: string[], requiredPermissions: string[]) {
    for (const rp of requiredPermissions)
      if (!userPermissions.includes(rp)) return false;
    return true;
  }

  userHasPermissionsOrThrow(userPermissions: string[], permissions: string[]) {
    if (this.userHasPermissions(userPermissions, permissions)) {
      return true;
    }
    throw new UnauthorizedException('You do not have required permissions!');
  }

  userHasRoles(userRoles: string[], roles: string[]) {
    for (const rr of roles) if (!userRoles.includes(rr)) return false;
    return true;
  }

  userHasRolesOrThrow(userRoles: string[], roles: string[]) {
    if (this.userHasRoles(userRoles, roles)) return true;

    throw new UnauthorizedException('You do not have required role!');
  }
}
