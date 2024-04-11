import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionPayload } from '@webpackages/model';
import { AuthExtractService, AuthJwtService, AuthService } from '../services';

/**
 * Check user has session
 *
 */
@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly extractService: AuthExtractService,
    private readonly jwtService: AuthJwtService
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const token = this.extractService.extractTokenOrThrow(ctx);
    const payload: SessionPayload = this.jwtService.verifyToken(token);
    await this.authService.findSessionByIdOrThrow(payload.sub);
    return true;
  }
}
