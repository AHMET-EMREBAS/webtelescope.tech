import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { convertUserToSession } from './user-to-session';
import {
  AuthExtractService,
  AuthJwtService,
  AuthUserService,
  AuthService,
} from '../services';

/**
 * Extract username and password from the request body,
 * Then find user by username, and verify the password
 * If user found and password matches, then create session, and append token to the request.
 */
@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: AuthUserService,
    private readonly extractService: AuthExtractService,
    private readonly jwtService: AuthJwtService
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const { username, password } =
      this.extractService.extractUsernameAndPassworFromBodyThrow(ctx);
    const user = await this.userService.findUserByUserNameOrThrow(username);
    this.authService.comparePasswordOrThrow(password, user.password);
    const newSession = convertUserToSession(user);
    const session = await this.authService.createSession(newSession);
    this.extractService.appendSessionToRequest(ctx, session);
    const token = this.jwtService.signToken(session);
    this.extractService.appendAuthorizationToken(ctx, token);
    return true;
  }
}
