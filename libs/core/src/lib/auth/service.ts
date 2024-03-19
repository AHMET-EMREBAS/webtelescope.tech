/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import { Session, SessionPayload, SecurityCode, User } from './user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { compareSync } from 'bcrypt';
import { AuthEnums } from './enums';
import {
  getRequiredPermissions,
  getRequiredRoles,
  isPublicAccess,
} from './policy';
import { LoginWithCodeDto, UpdatePasswordDto } from './dto';
import { v4 } from 'uuid';

export class AuthService {
  constructor(
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectRepository(Session)
    protected readonly sessionRepo: Repository<Session>,
    @InjectRepository(SecurityCode)
    private readonly tokenRepo: Repository<SecurityCode>,
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

  async findUserById(id: number) {
    return this.userRepo.findOneBy({ id });
  }
  async findUserByIdOrThrow(id: number) {
    const found = await this.findUserById(id);
    if (found) return found;
    throw new UnauthorizedException('User not found by id!');
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    await this.findUserByIdOrThrow(userId);
    return await this.userRepo.update(userId, {
      password: updatePasswordDto.password,
    });
  }

  async findUserBySecurityCode(securityCode: string) {
    const all = await this.tokenRepo.find();
    console.log(all);
    console.log(`$${securityCode}$`);
    const found = await this.tokenRepo.findOneBy({ securityCode });
    console.log(found);

    if (found) {
      const user = found.user;
      if (user) {
        const id = user.id;
        return await this.userRepo.findOneBy({ id });
      }
    }
    return undefined;
  }

  async findUserBySecurityCodeOrThrow(securityCode: string) {
    const user = await this.findUserBySecurityCode(securityCode);
    if (user) return user;
    throw new UnauthorizedException('Could not find user by security code!');
  }

  comparePassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  comparePasswordOrThrow(password: string, hashPassword: string) {
    if (this.comparePassword(password, hashPassword)) return true;

    throw new UnauthorizedException('Wrong password');
  }

  async createSecurityCode(user: User) {
    const { id } = await this.tokenRepo.save({ securityCode: v4(), user });
    return await this.tokenRepo.findOneBy({ id });
  }

  async createSecurityCodeOrThrow(user: User) {
    const securityCode = await this.createSecurityCode(user);
    if (securityCode) return securityCode;
    throw new UnauthorizedException('Could not create security code!');
  }

  findSessionById(sessionId: number) {
    return this.sessionRepo.findOneBy({ id: sessionId });
  }

  async findSessionByIdOrThrow(sessionId: number): Promise<Session> | never {
    const found = await this.findSessionById(sessionId);
    if (found) return found;
    throw new UnauthorizedException('Session not found!');
  }

  async createSession(user: User) {
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

  appendSessionToRequest(ctx: ExecutionContext, session: Session) {
    (this.request(ctx) as any)[AuthEnums.SESSION] = session;
  }

  appendUserToRequest(ctx: ExecutionContext, user: User) {
    (this.request(ctx) as any)[AuthEnums.USER] = user;
  }

  extractUsernameFromBody(ctx: ExecutionContext) {
    const { username } = this.request(ctx).body;
    if (username) return username;
    return undefined;
  }

  extractUsernameFromBodyOrThrow(ctx: ExecutionContext) {
    const username = this.extractUsernameFromBody(ctx);
    if (username) return username;
    throw new UnauthorizedException('Username is not provided!');
  }

  extractUsernameAndPassworFromBody(ctx: ExecutionContext) {
    const { username, password } = this.request(ctx).body;
    if (username && password) return { username, password };
    return undefined;
  }

  extractUsernameAndPassworFromBodyThrow(ctx: ExecutionContext) {
    const credentials = this.extractUsernameAndPassworFromBody(ctx);
    if (credentials) return credentials;
    throw new UnauthorizedException('Username or password is not provided!');
  }

  extractSecurityCodeFromQuery(ctx: ExecutionContext) {
    const { securityCode } = this.request(ctx).query as any as LoginWithCodeDto;
    return securityCode;
  }

  extractSecurityCodeFromQueryOrThrow(ctx: ExecutionContext) {
    const securityCode = this.extractSecurityCodeFromQuery(ctx);

    if (securityCode) return securityCode;
    throw new UnauthorizedException('Security code is not provided!');
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
    return isPublicAccess(this.reflector, ctx);
  }

  requiredPermissions(ctx: ExecutionContext) {
    return getRequiredPermissions(this.reflector, ctx);
  }

  requiredRoles(ctx: ExecutionContext) {
    return getRequiredRoles(this.reflector, ctx);
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
