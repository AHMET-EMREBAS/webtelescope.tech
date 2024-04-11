import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginWithCodeDto } from '@webpackages/dto';
import { ICredentials, IRequest } from '@webpackages/model';
import { Session, User } from '@webpackages/entity';
import { AuthEnums } from '@webpackages/common';

@Injectable()
export class AuthExtractService {
  private logger!: Logger;

  constructor() {
    this.logger = new Logger(AuthExtractService.name);
  }
  request(ctx: ExecutionContext): IRequest {
    return ctx.switchToHttp().getRequest();
  }
  /**
   * Get the authorization property from headers
   * @param ctx
   * @returns
   */
  extractAuthorizationToken(ctx: ExecutionContext) {
    const headers = this.request(ctx).headers;
    const bearerToken = headers.authorization ?? undefined;
    const [, token] = bearerToken?.split(' ') ?? [];

    this.logger.debug(`Extracted Bearer Authorization Token : ${bearerToken}`);
    this.logger.debug(`Extracted Authorization Token : ${token}`);
    return token;
  }

  extractTokenOrThrow(ctx: ExecutionContext) {
    const token = this.extractAuthorizationToken(ctx);
    if (token) {
      return token;
    }
    throw new UnauthorizedException('You do not have a session!');
  }

  extractOrganizationNameFromHeader(ctx: ExecutionContext) {
    const result = this.request(ctx).headers[AuthEnums.X_ORGNAME] as string;
    this.logger.debug(`Extracted Orgname : ${result}`);
    return result;
  }

  extractOAuthApiKeyFromHeader(ctx: ExecutionContext) {
    const result = this.request(ctx).headers[
      AuthEnums.X_OAUTH_API_KEY
    ] as string;

    this.logger.debug(`Extracted OAuth API Key : ${result}`);
    return result;
  }

  appendAuthorizationToken(ctx: ExecutionContext, token: string) {
    this.request(ctx).headers.authorization = token;
    this.logger.debug(`Appended the token ${token} to authorization header`);
  }

  appendSessionToRequest(ctx: ExecutionContext, session: Session) {
    this.request(ctx)[AuthEnums.SESSION] = session;
    this.logger.debug(
      `Appended the session ${session} to authorization header`
    );
  }

  getSessionFromRequest(ctx: ExecutionContext): Session {
    const result = this.request(ctx)[AuthEnums.SESSION];
    this.logger.debug(`Extracted Session From Request : ${result}`);
    return result;
  }

  getParamId(ctx: ExecutionContext): string {
    const result = this.request(ctx).params['id'];
    this.logger.debug(`Extracted Id Param From Request: ${result}`);
    return result;
  }

  appendUserToRequest(ctx: ExecutionContext, user: User) {
    this.request(ctx)[AuthEnums.USER] = user;
    this.logger.debug(`Appnded user data to request : ${user}`);
  }

  extractUsernameFromBody(ctx: ExecutionContext): string | undefined {
    const body = this.request(ctx);
    const { username } = body.user;
    if (username) {
      this.logger.debug(`Extracted username from request : ${username}`);
      return username;
    }
    this.logger.debug(`Request Body: ${body}`);
    this.logger.debug(`Username cound not found in request body! `);
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
    const body = this.request(ctx).body;
    const { username, password } = body;
    if (username && password) {
      this.logger.debug(`username: ${username}, password: ${password}`);
      this.logger.debug(`Extracted username and passwor from request body.`);
      return { username, password };
    }
    this.logger.debug(`Request Body : ${body}`);
    this.logger.debug(`Username or password are not in request body!`);
    return undefined;
  }

  extractUsernameAndPassworFromBodyThrow(ctx: ExecutionContext) {
    const credentials = this.extractUsernameAndPassworFromBody(ctx);
    if (credentials) return credentials;
    throw new UnauthorizedException('Username or password is not provided!');
  }

  extractSecurityCodeFromQuery(ctx: ExecutionContext) {
    const query = this.request(ctx).query;
    const { securityCode } = query as LoginWithCodeDto;
    this.logger.debug(`Extracted security code from query ${securityCode}`);
    return securityCode;
  }

  extractSecurityCodeFromQueryOrThrow(ctx: ExecutionContext) {
    const securityCode = this.extractSecurityCodeFromQuery(ctx);
    if (securityCode) return securityCode;
    throw new UnauthorizedException('Security code is not provided!');
  }
}
