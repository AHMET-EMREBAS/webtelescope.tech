import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
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
  private logger: Logger;
  constructor(
    protected readonly authService: AuthService,
    protected readonly metaService: AuthMetaService,
    protected readonly extractService: AuthExtractService,
    protected readonly jwtService: AuthJwtService
  ) {
    this.logger = new Logger(AuthGuard.name);
  }

  async canActivate(ctx: ExecutionContext) {
    this.logger.debug('Start');
    if (this.metaService.isPublic(ctx)) return true;
    if (this.metaService.isAuthGuardByPassed(ctx)) return true;
    if (await this.authService.isAuthorizedOAuthClient(ctx)) return true;

    if (await this.authService.isAuthorizedOrThrow(ctx)) {
      return true;
    }

    this.logger.debug('End');

    return false;
  }
}
