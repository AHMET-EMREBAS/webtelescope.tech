import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { SessionPayload } from '@webpackages/model';

/**
 * Check the resource is public
 * Check user has valid session
 * Check user has required permissions and roles
 * Append the session to request
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected readonly authService: AuthService) {}

  async hasOAuthApiKey(ctx: ExecutionContext) {
    if (this.authService.isPublic(ctx)) return true;

    const orgName = this.authService.extractOrganizationNameFromHeader(ctx);
    // If request made from the client of this application, then return true
    // Else if the request made from 3rd party application to the subscriber organization, then check the OAuth api key.
    if (!orgName || orgName === 'main') {
      return true;
    }

    const apiKey = this.authService.extractOAuthApiKeyFromHeader(ctx);
    const oauth = await this.authService.findOAuthByApiKey(apiKey);

    if (oauth) {
      const requiredScopes = this.authService.requiredScopes(ctx);

      if (requiredScopes) {
        const hasRequiredScopes = this.authService.oauthHasScopes(
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
    const token = this.authService.extractTokenOrThrow(ctx);
    const payload: SessionPayload = this.authService.verifyToken(token);
    const session = await this.authService.findSessionByIdOrThrow(payload.sub);

    const requiredPermissions = this.authService.requiredPermissions(ctx);
    const requiredRoles = this.authService.requiredRoles(ctx);

    this.authService.userHasPermissionsOrThrow(
      session.permissions,
      requiredPermissions
    );

    this.authService.userHasRolesOrThrow(session.roles, requiredRoles);

    this.authService.appendSessionToRequest(ctx, session);

    return true;
  }
}
