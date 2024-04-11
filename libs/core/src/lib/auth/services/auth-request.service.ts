import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthEnums } from '../enums';
import { LoginWithCodeDto } from '@webpackages/dto';
import { ICredentials, IRequest } from '@webpackages/model';
import { Session, User } from '@webpackages/entity';

@Injectable()
export class AuthExtractService {
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
    return token;
  }

  extractTokenOrThrow(ctx: ExecutionContext) {
    const token = this.extractAuthorizationToken(ctx);
    if (token) return token;
    throw new UnauthorizedException('You do not have a session!');
  }

  extractOrganizationNameFromHeader(ctx: ExecutionContext) {
    return this.request(ctx).headers[AuthEnums.X_ORGNAME] as string;
  }

  extractOAuthApiKeyFromHeader(ctx: ExecutionContext) {
    return this.request(ctx).headers[AuthEnums.X_OAUTH_API_KEY] as string;
  }

  appendAuthorizationToken(ctx: ExecutionContext, token: string) {
    this.request(ctx).headers.authorization = token;
  }

  appendSessionToRequest(ctx: ExecutionContext, session: Session) {
    this.request(ctx)[AuthEnums.SESSION] = session;
  }

  getSessionFromRequest(ctx: ExecutionContext): Session {
    return this.request(ctx)[AuthEnums.SESSION];
  }

  getParamId(ctx: ExecutionContext): string {
    return this.request(ctx).params['id'];
  }

  appendUserToRequest(ctx: ExecutionContext, user: User) {
    this.request(ctx)[AuthEnums.USER] = user;
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
    const { securityCode } = this.request(ctx).query as LoginWithCodeDto;
    return securityCode;
  }

  extractSecurityCodeFromQueryOrThrow(ctx: ExecutionContext) {
    const securityCode = this.extractSecurityCodeFromQuery(ctx);

    if (securityCode) return securityCode;
    throw new UnauthorizedException('Security code is not provided!');
  }
}
