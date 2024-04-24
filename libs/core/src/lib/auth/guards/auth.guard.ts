import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CommonRoles,
  Sub,
  extractBearerApiKey,
  getPermission,
  getPublic,
  getRole,
  getScope,
} from '../common';
import {
  IUserService,
  ITokenService,
  InjectUserService,
  InjectRootUserService,
  InjectTokenService,
} from '../services';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger();

  constructor(
    protected readonly reflector: Reflector,
    @InjectTokenService() protected readonly tokenService: ITokenService,
    @InjectUserService() protected readonly userService: IUserService,
    @InjectRootUserService()
    protected readonly rootUserService: IUserService
  ) {}

  log(msg: string) {
    this.logger.debug(msg, AuthGuard.name);
  }

  async isRootUser(sub: Sub) {
    const found = await this.rootUserService.findById(sub.sub);
    if (found?.roles?.find((e) => e.name == CommonRoles.ROOT)) {
      return true;
    }
    return false;
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = getPublic(this.reflector, context);

    if (isPublic) {
      this.log('Public resource access!');
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();

    console.table(req.cookies);
    const token = extractBearerApiKey(context);

    if (!token) {
      this.log('Token is not found!');
      return false;
    }

    const sub = await this.tokenService.verify(token);
    if (!sub) {
      this.log('Token is not verified!');
      return false;
    }

    // Check the user is root user
    if (await this.isRootUser(sub)) {
      return true;
    }

    // Regular user
    const user = await this.userService.findById(sub.sub);
    if (!user) {
      this.log(`User could not be found by id ${sub.sub} `);
      return false;
    }

    // Common user authorization
    const rScope = getScope(this.reflector, context);
    const rRole = getRole(this.reflector, context);
    const rPermission = getPermission(this.reflector, context);

    // Special user authorization like Admin, Root, and Developer
    if (
      user.roles?.find((e) => {
        return (
          e.name === CommonRoles.ADMIN || e.name === CommonRoles.ROOT || e.name
        );
      })
    ) {
      this.log('User has a special');
      return true;
    }

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
