import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { getPermission, getPublic, getRole } from '../metadata';
import { extractApiKey, extractAuthCookie } from '../extractors';
import { IAuthUserService } from '../user-service';
import { InjectAuthUserService } from '../providers';
import { Sub } from '../sub';

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

    const { sub } = this.jwt.verify<Sub>(token);
    if (!sub) return false;

    const user = await this.userService.findById(sub);
    if (!user) return false;

    const requriedRole = getRole(this.reflector, context);
    const requiredPermission = getPermission(this.reflector, context);

    if (requriedRole) {
      // Then, check the user has required roles
      if (user.roles?.find((e) => e.name === requriedRole)) {
        return true;
      } else {
        return false;
      }
    }

    if (requiredPermission) {
      // Then, check the user has required permissions
      if (
        user.roles?.find((e) =>
          e.permissions?.find((p) => p.name === requiredPermission)
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}
