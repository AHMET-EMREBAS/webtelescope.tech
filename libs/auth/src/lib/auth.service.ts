/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import { Mail, OAuth, SecurityCode, Sub } from '@webpackages/entity';
import { Repository } from 'typeorm';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  CreateMailDto,
  CreateSubDto,
  UpdatePasswordDto,
  UpdateResult,
} from '@webpackages/dto';
import { v4 } from 'uuid';
import { IUser, MessageResponse, SessionPayload } from '@webpackages/model';
import { compareSync } from 'bcrypt';
import {
  AuthExtractService,
  AuthJwtService,
  AuthMetaService,
  AuthSessionService,
  AuthUserService,
} from './services';
import { userToSession } from './common';
import { DatabaseFactory } from './database';

@Injectable()
export class AuthService {
  private readonly logger!: Logger;
  constructor(
    @InjectRepository(Sub)
    protected readonly subRepo: Repository<Sub>,

    @InjectRepository(SecurityCode)
    private readonly securityCodeRepo: Repository<SecurityCode>,

    @InjectRepository(OAuth)
    private readonly oauthRepo: Repository<OAuth>,

    @InjectRepository(Mail)
    protected readonly mailRepo: Repository<Mail>,
    protected readonly extractService: AuthExtractService,
    protected readonly jwtService: AuthJwtService,
    protected readonly metaService: AuthMetaService,
    protected readonly userService: AuthUserService,
    protected readonly sessionService: AuthSessionService
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * Extract and verify token, return session or throw session-not-found error
   * @param ctx
   * @returns
   */
  async hasValidSessionOrThrow(ctx: ExecutionContext) {
    const token = this.extractService.extractTokenOrThrow(ctx);
    const payload: SessionPayload = this.jwtService.verifyToken(token);
    const session = await this.sessionService.findSessionByIdOrThrow(
      payload.sub
    );
    this.logger.debug(`User has a valid session : ${session}`);
    return session;
  }

  async verifyUsernameOrThrow(ctx: ExecutionContext) {
    const username = this.extractService.extractUsernameFromBodyOrThrow(ctx);
    const found = await this.userService.findUserByUserNameOrThrow(username);
    this.extractService.appendUserToRequest(ctx, found);
  }

  /**
   * Check user has required permissions and roles or throw user-not-autorized error
   * @param ctx
   * @param session
   * @returns
   */
  async isAuthorizedOrThrow(ctx: ExecutionContext) {
    const session = await this.hasValidSessionOrThrow(ctx);
    const requiredPermissions = this.metaService.getRequiredPermissions(ctx);
    const requiredRoles = this.metaService.getRequiredRoles(ctx);

    if (requiredPermissions)
      this.metaService.userHasPermissionsContainRequiredPermissionsOrThrow(
        session.permissions,
        requiredPermissions
      );

    if (requiredRoles)
      this.metaService.userRolesContainsRequiredRolesOrThrow(
        session.roles,
        requiredRoles
      );

    this.extractService.appendSessionToRequest(ctx, session);

    return true;
  }

  protected async isMainOrganizationAccess(ctx: ExecutionContext) {
    const orgName = this.extractService.extractOrganizationNameFromHeader(ctx);
    // If request made from the client of this application, then return true
    // Else if the request made from 3rd party application to the subscriber organization, then check the OAuth api key.
    if (!orgName || orgName === 'main') {
      return true;
    }
    this.logger.debug(`Organization Name : ${orgName}`);
    return false;
  }

  async isAuthorizedOAuthClient(ctx: ExecutionContext) {
    const apiKey = this.extractService.extractOAuthApiKeyFromHeader(ctx);
    const oauth = await this.findOAuthByApiKey(apiKey);

    if (oauth) {
      const requiredScopes = this.metaService.getRequiredScopes(ctx);

      if (requiredScopes) {
        const hasRequiredScopes = this.metaService.oAuthHasRequiredScopes(
          oauth.scopes.map((e) => e.scope),
          requiredScopes
        );
        if (hasRequiredScopes) {
          return true;
        } else {
          return false;
        }
      }

      this.logger.debug('There is no scope restriction for the resource!');

      return true;
    }
    this.logger.debug('OAuth key not provided!');
    return false;
  }

  async verifyCredentialsAndCreateSessionOrThrow(ctx: ExecutionContext) {
    const { username, password } =
      this.extractService.extractUsernameAndPassworFromBodyThrow(ctx);
    const user = await this.userService.findUserByUserNameOrThrow(username);
    await this.comparePasswordOrThrow(password, user.password);

    const newSession = userToSession(user);
    const session = await this.sessionService.createSession(newSession);
    this.extractService.appendSessionToRequest(ctx, session);
    const token = this.jwtService.signToken(session);
    this.extractService.appendAuthorizationToken(ctx, token);
  }

  async verifySecurityCodeAndCreateSessionOrThrow(ctx: ExecutionContext) {
    const securityCode =
      this.extractService.extractSecurityCodeFromQueryOrThrow(ctx);

    const user = await this.userService.findUserBySecurityCodeOrThrow(
      securityCode
    );

    const session = await this.sessionService.createSession(
      userToSession(user)
    );

    const token = this.jwtService.signToken(session);

    this.extractService.appendAuthorizationToken(ctx, token);
  }

  async findOAuthByApiKey(apiKey: string) {
    return await this.oauthRepo.findOneBy({ apiKey });
  }

  async createSecurityCode(user: IUser) {
    const { id } = await this.securityCodeRepo.save({
      securityCode: v4(),
      user,
    });
    return await this.securityCodeRepo.findOneBy({ id });
  }

  async createSecurityCodeOrThrow(user: IUser) {
    const securityCode = await this.createSecurityCode(user);
    if (securityCode) return securityCode;
    throw new UnauthorizedException('Could not create security code!');
  }

  async signup(
    targetOrgname: string,
    signupDto: CreateSubDto
  ): Promise<MessageResponse> {
    this.logger.debug(
      `Trying to sign up the user ${signupDto.username} - ${signupDto.orgname}`
    );

    const { username } = signupDto;

    try {
      await this.subRepo.findOneByOrFail({ username });
      this.logger.error(`${username} already exists!`);
    } catch (err) {
      try {
        this.logger.debug('Trying to create subscription user');
        const saved = await this.subRepo.save(signupDto);

        this.logger.error(`Saved ${saved.username}`);

        const { orgname, username, password } = signupDto;

        await DatabaseFactory.createDatabaseIFNotExist(orgname);

        await DatabaseFactory.updateTemplateDatabaseForUser(
          orgname,
          username,
          password
        );

        return { message: `Welcome to ${targetOrgname}.` };
      } catch (err) {
        this.logger.debug('Could not create the subscription user');
        console.error(err);
      }
    }
    throw new UnprocessableEntityException('The username is already in user!');
  }

  async sendEmail(mail: CreateMailDto) {
    this.logger.debug(`Sending email ${mail}`);
    return await this.mailRepo.save(mail);
  }

  comparePassword(password: string, hashPassword: string) {
    this.logger.debug('Comparing passwords');
    return compareSync(password, hashPassword);
  }

  async comparePasswordOrThrow(password: string, hashPassword: string) {
    if (this.comparePassword(password, hashPassword)) {
      this.logger.debug(`Passwords match`);
      return true;
    }

    this.logger.error('Wrong password');

    throw new UnauthorizedException('Wrong password');
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<UpdateResult> {
    return await this.userService.updatePassword(userId, updatePasswordDto);
  }
}
