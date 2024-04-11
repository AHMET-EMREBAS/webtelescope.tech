import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '../services';

/**
 * Extract username and password from the request body,
 * Then find user by username, and verify the password
 * If user found and password matches, then create session, and append token to the request.
 */
@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    await this.authService.verifyCredentialsAndCreateSessionOrThrow(ctx);
    return true;
  }
}
