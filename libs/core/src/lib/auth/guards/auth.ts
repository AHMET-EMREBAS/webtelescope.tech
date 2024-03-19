import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { SessionPayload } from '../user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    if (this.authService.isPublic(ctx)) return true;

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
