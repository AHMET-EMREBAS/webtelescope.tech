import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionPayload } from '@webpackages/model';
import {
  AuthExtractService,
  AuthJwtService,
  AuthMetaService,
  AuthService,
} from '../services';

/**
 * Check the resource is public
 * Check user has valid session
 * Check user has required permissions and roles
 * Append the session to request
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly authService: AuthService,
    protected readonly metaService: AuthMetaService,
    protected readonly extractService: AuthExtractService,
    protected readonly jwtService: AuthJwtService
  ) {}

  async hasOAuthApiKey(ctx: ExecutionContext) {
    if (this.metaService.isPublic(ctx)) return true;

    const orgName = this.extractService.extractOrganizationNameFromHeader(ctx);
    // If request made from the client of this application, then return true
    // Else if the request made from 3rd party application to the subscriber organization, then check the OAuth api key.
    if (!orgName || orgName === 'main') {
      return true;
    }

    const apiKey = this.extractService.extractOAuthApiKeyFromHeader(ctx);
    const oauth = await this.authService.findOAuthByApiKey(apiKey);

    if (oauth) {
      const requiredScopes = this.metaService.requiredScopes(ctx);

      if (requiredScopes) {
        const hasRequiredScopes = this.metaService.oauthHasScopes(
          oauth.scopes.map((e) => e.scope),
          requiredScopes
        );
        if (hasRequiredScopes) {
          return true;
        }
      }

      return true;
    }
    return false;
  }

  async canActivate(ctx: ExecutionContext) {
    if (await this.hasOAuthApiKey(ctx)) {
      return true;
    }
    const token = this.extractService.extractTokenOrThrow(ctx);
    const payload: SessionPayload = this.jwtService.verifyToken(token);
    const session = await this.authService.findSessionByIdOrThrow(payload.sub);

    const requiredPermissions = this.metaService.requiredPermissions(ctx);
    const requiredRoles = this.metaService.requiredRoles(ctx);

    this.metaService.userHasPermissionsOrThrow(
      session.permissions,
      requiredPermissions
    );

    this.metaService.userHasRolesOrThrow(session.roles, requiredRoles);

    this.extractService.appendSessionToRequest(ctx, session);

    return true;
  }
}
