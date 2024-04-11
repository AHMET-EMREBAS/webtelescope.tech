import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { convertUserToSession } from './user-to-session';
import {
  AuthExtractService,
  AuthJwtService,
  AuthService,
  AuthUserService,
} from '../services';

/**
 * Extract security code from the request query object
 * Then, find the user by security code
 * If found, create user session, and append authorization token to
 */
@Injectable()
export class SecurityCodeGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly extractService: AuthExtractService,
    private readonly userService: AuthUserService,
    private readonly jwtService: AuthJwtService
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const securityCode =
      this.extractService.extractSecurityCodeFromQueryOrThrow(ctx);

    const user = await this.userService.findUserBySecurityCodeOrThrow(
      securityCode
    );

    const session = await this.authService.createSession(
      convertUserToSession(user)
    );

    const token = this.jwtService.signToken(session);

    this.extractService.appendAuthorizationToken(ctx, token);

    return true;
  }
}
