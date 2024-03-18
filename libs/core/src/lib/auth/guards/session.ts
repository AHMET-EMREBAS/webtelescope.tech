import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { SessionPayload } from '../user';

/**
 * Check user has a valid token or not
 */
@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    const token = this.authService.extractTokenOrThrow(ctx);
    const payload: SessionPayload = this.authService.verifyToken(token);
    await this.authService.findSessionByIdOrThrow(payload.sub);
    return true;
  }
}
