import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

  async canActivate(ctx: ExecutionContext) {
    if (this.metaService.isPublic(ctx)) return true;
    if (this.metaService.isAuthGuardByPassed(ctx)) return true;
    if (await this.authService.isAuthorizedOAuthClient(ctx)) return true;
    
    await this.authService.isAuthorizedOrThrow(ctx);

    return true;
  }
}
