import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthExtractService, AuthSessionService } from '../services';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly authExtractService: AuthExtractService,
    private readonly sessionService: AuthSessionService
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const session = this.authExtractService.getSessionFromRequest(ctx);
    await this.sessionService.deleteSession(session.id);
    return true;
  }
}
