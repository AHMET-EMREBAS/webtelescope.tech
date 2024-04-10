/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import {
  Mail,
  OAuth,
  SecurityCode,
  Session,
  Sub,
  User,
} from '@webpackages/entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  CreateMailDto,
  CreateSubDto,
  LoginWithCodeDto,
  UpdatePasswordDto,
} from '@webpackages/dto';
import { v4 } from 'uuid';
import {
  ICreateSessionDto,
  ICredentials,
  SessionPayload,
} from '@webpackages/model';
import {
  getRequiredPermissions,
  getRequiredRoles,
  getRequiredScope,
  getResourceName,
  isPublicAccess,
} from './policy';
import { compareSync } from 'bcrypt';
import { AuthEnums } from './enums';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>,

    @InjectRepository(Session)
    protected readonly sessionRepo: Repository<Session>,

    @InjectRepository(Sub)
    protected readonly subRepo: Repository<Sub>,

    @InjectRepository(SecurityCode)
    private readonly securityCodeRepo: Repository<SecurityCode>,

    @InjectRepository(OAuth)
    private readonly oauthRepo: Repository<OAuth>,

    @InjectRepository(Mail)
    protected readonly mailRepo: Repository<Mail>,

    protected readonly jwt: JwtService,
    private readonly reflector: Reflector
  ) {}

  async findUserByUsername(username: string) {
    return await this.userRepo.findOne({
      where: { username },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });
  }

  async findUserByUserNameOrThrow(username: string) {
    const found = await this.findUserByUsername(username);
    if (found) return found;
    throw new UnauthorizedException('User not found!');
  }

  async findUserById(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['organization', 'roles'],
      loadEagerRelations: true,
    });
  }

  async findUserByIdOrThrow(id: number) {
    const found = await this.findUserById(id);
    if (found) return found;
    throw new UnauthorizedException('User not found by id!');
  }

  async findOAuthByApiKey(apiKey: string) {
    return await this.oauthRepo.findOneBy({ apiKey });
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    await this.findUserByIdOrThrow(userId);
    return await this.userRepo.update(userId, {
      password: updatePasswordDto.password,
    });
  }

  async findUserBySecurityCode(securityCode: string) {
    await this.securityCodeRepo.find();
    const found = await this.securityCodeRepo.findOneBy({ securityCode });

    if (found) return await this.userRepo.findOneBy({ id: found.userId });

    return undefined;
  }

  async findUserBySecurityCodeOrThrow(securityCode: string) {
    const user = await this.findUserBySecurityCode(securityCode);
    if (user) return user;
    throw new UnauthorizedException('Could not find user by security code!');
  }

  async createSecurityCode(user: User) {
    const { id } = await this.securityCodeRepo.save({
      securityCode: v4(),
      user,
    });
    return await this.securityCodeRepo.findOneBy({ id });
  }

  async createSecurityCodeOrThrow(user: User) {
    const securityCode = await this.createSecurityCode(user);
    if (securityCode) return securityCode;
    throw new UnauthorizedException('Could not create security code!');
  }

  async findSessionById(sessionId: number) {
    return await this.sessionRepo.findOneBy({ id: sessionId });
  }

  async findSessionByIdOrThrow(sessionId: number): Promise<Session> | never {
    const found = await this.findSessionById(sessionId);
    if (found) return found;

    throw new UnauthorizedException('Session not found!');
  }

  async createSession(session: ICreateSessionDto) {
    return await this.sessionRepo.save(session);
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

  async signup(signupDto: CreateSubDto) {
    const { username } = signupDto;
    try {
      await this.subRepo.findOneByOrFail({ username });
    } catch (err) {
      return await this.subRepo.save(signupDto);
    }
    throw new UnprocessableEntityException('The username is already in user!');
  }

  async sendEmail(mail: CreateMailDto) {
    return await this.mailRepo.save(mail);
  }

  resourceName(ctx: ExecutionContext) {
    return getResourceName(this.reflector, ctx);
  }

  comparePassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  comparePasswordOrThrow(password: string, hashPassword: string) {
    if (this.comparePassword(password, hashPassword)) return true;

    throw new UnauthorizedException('Wrong password');
  }

  extractToken(ctx: ExecutionContext) {
    const headers = this.request(ctx).headers;
    const bearerToken = headers.authorization ?? undefined;
    const [, token] = bearerToken?.split(' ') ?? [];
    return token;
  }

  extractTokenOrThrow(ctx: ExecutionContext) {
    const token = this.extractToken(ctx);
    if (token) return token;
    throw new UnauthorizedException('You do not have a session!');
  }

  extractOrganizationNameFromHeader(ctx: ExecutionContext) {
    return this.request(ctx).headers[AuthEnums.X_ORGANIZATION] as string;
  }

  extractOAuthApiKeyFromHeader(ctx: ExecutionContext) {
    return this.request(ctx).headers[AuthEnums.X_OAUTH_API_KEY] as string;
  }

  appendAuthorizationToken(ctx: ExecutionContext, token: string) {
    this.request(ctx).headers.authorization = token;
  }

  appendSessionToRequest(ctx: ExecutionContext, session: Session) {
    (this.request(ctx) as any)[AuthEnums.SESSION] = session;
  }

  getSessionFromRequest(ctx: ExecutionContext): Session {
    return (this.request(ctx) as any)[AuthEnums.SESSION];
  }

  getParamId(ctx: ExecutionContext): string {
    return this.request(ctx).params['id'];
  }

  appendUserToRequest(ctx: ExecutionContext, user: User) {
    (this.request(ctx) as any)[AuthEnums.USER] = user;
  }

  extractUsernameFromBody(ctx: ExecutionContext): string | undefined {
    const { username } = this.request(ctx).body;
    if (username) return username;
    return undefined;
  }

  extractUsernameFromBodyOrThrow(ctx: ExecutionContext) {
    const username = this.extractUsernameFromBody(ctx);
    if (username) return username;
    throw new UnauthorizedException('Username is not provided!');
  }

  extractUsernameAndPassworFromBody(
    ctx: ExecutionContext
  ): ICredentials | undefined {
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

  requiredScopes(ctx: ExecutionContext) {
    return getRequiredScope(this.reflector, ctx);
  }

  requiredPermissions(ctx: ExecutionContext) {
    return getRequiredPermissions(this.reflector, ctx);
  }

  requiredRoles(ctx: ExecutionContext) {
    return getRequiredRoles(this.reflector, ctx);
  }

  userHasPermissions(userPermissions: string[], requiredPermissions: string[]) {
    if (userPermissions.includes('ADMIN')) {
      return true;
    }
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

  oauthHasScopes(oauthScopes: string[], scopes: string[]): boolean {
    for (const s of scopes) if (!oauthScopes.includes(s)) return false;
    return true;
  }

  userHasRolesOrThrow(userRoles: string[], roles: string[]) {
    if (this.userHasRoles(userRoles, roles)) return true;

    throw new UnauthorizedException('You do not have required role!');
  }
}
