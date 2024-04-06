import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@webpackages/core';
import { Organization, Session, User } from '@webpackages/entity';
import { OperationNames } from '@webpackages/rest';

/**
 * Prevent user from deleting his own data
 */
@Injectable()
export class NotDeleteGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(ctx: ExecutionContext) {
    const handler = ctx.getHandler().name;
    const rn = this.authService.resourceName(ctx);

    if (handler === OperationNames.delete)
      if (rn === User.name || rn === Organization.name || rn === Session.name) {
        const session = this.authService.getSessionFromRequest(ctx);
        const paramId = this.authService.getParamId(ctx);

        if (session.userId + '' == paramId) {
          throw new UnauthorizedException('You cannot delete your own data!');
        }
      }

    return true;
  }
}
