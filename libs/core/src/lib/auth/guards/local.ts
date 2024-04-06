import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';

import { userToSession } from './user-to-session';

/**
 * Extract username and password from the request body,
 * Then find user by username, and verify the password
 * If user found and password matches, then create session, and append token to the request.
 */
@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const { username, password } =
      this.authService.extractUsernameAndPassworFromBodyThrow(ctx);
    const user = await this.authService.findUserByUserNameOrThrow(username);
    this.authService.comparePasswordOrThrow(password, user.password);
    const newSession = userToSession(user);
    const session = await this.authService.createSession(newSession);
    this.authService.appendSessionToRequest(ctx, session);
    const token = this.authService.signToken(session);
    this.authService.appendAuthorizationToken(ctx, token);
    return true;
  }
}
