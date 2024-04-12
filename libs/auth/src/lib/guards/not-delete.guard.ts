import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthExtractService, AuthMetaService } from './../services';

/**
 * Prevent user from deleting his own data
 */
@Injectable()
export class NotDeleteGuard implements CanActivate {
  constructor(
    private readonly metaService: AuthMetaService,
    private readonly extractService: AuthExtractService
  ) {}

  canActivate(ctx: ExecutionContext) {
    const handler = ctx.getHandler().name;
    const rn = this.metaService.resourceName(ctx);
    const session = this.extractService.getSessionFromRequest(ctx);
    const paramId = this.extractService.getParamId(ctx);

    if (handler === 'delete') {
      if (rn === 'User') {
        if (session.userId + '' == paramId) {
          throw new UnauthorizedException('You cannot delete your own data!');
        }
      } else if (rn === 'Org') {
        if (session.orgId + '' === paramId) {
          throw new UnauthorizedException('You cannot delete your own data!');
        }
      }
    }

    return true;
  }
}
