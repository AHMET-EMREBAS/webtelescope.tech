import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthExtractService, AuthMetaService } from '@webpackages/core';
import { Org, Session, User } from '@webpackages/entity';
import { OperationNames } from '@webpackages/rest';

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

    if (handler === OperationNames.delete) {
      if (rn === User.name || rn === Org.name || rn === Session.name) {
        const session = this.extractService.getSessionFromRequest(ctx);
        const paramId = this.extractService.getParamId(ctx);

        if (session.userId + '' == paramId) {
          throw new UnauthorizedException('You cannot delete your own data!');
        }
      }
    }

    return true;
  }
}
