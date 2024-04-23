import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  extractApiKey,
  extractAuthCookie,
  getPermission,
  getPublic,
  getRole,
  getScope,
  IAuthUserService,
  InjectAuthUserService,
  Sub,
} from '../common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwt: JwtService,
    @InjectAuthUserService() protected readonly userService: IAuthUserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = getPublic(this.reflector, context);
    if (isPublic) return true;

    const token = extractApiKey(context) ?? extractAuthCookie(context);
    if (!token) return false;

    const sub = this.jwt.verify<Sub>(token);
    if (!sub) return false;

    const user = await this.userService.findById(sub.sub);
    if (!user) return false;

    const rScope = getScope(this.reflector, context);
    const rRole = getRole(this.reflector, context);
    const rPermission = getPermission(this.reflector, context);

    /**
     * To authorize the user, user must have
     * 1. required scope,
     * 2. required role,
     * 3. required permission
     * So, there are 3 required checks
     **/
    const rAuthCount = 3;
    const checkList: boolean[] = [];

    const HaveIt = () => checkList.push(true);
    const NotRequired = () => checkList.push(true);
    const NotHaveIt = () => checkList.push(false);
    const IsAuthorized = () =>
      checkList.length == rAuthCount && checkList.reduce((p, c) => p && c);

    // 1. Scope check
    rScope
      ? user.scopes?.find((e) => e.name === rScope)
        ? HaveIt()
        : NotHaveIt()
      : NotRequired();

    // 2. Role check
    rRole
      ? user.roles?.find((e) => e.name === rRole)
        ? HaveIt()
        : NotHaveIt()
      : NotRequired();

    // 3. Permission check
    rPermission
      ? user.roles?.find((e) =>
          e.permissions?.find((p) => p.name === rPermission)
        )
        ? HaveIt()
        : NotHaveIt()
      : NotRequired();

    return IsAuthorized();
  }
}
