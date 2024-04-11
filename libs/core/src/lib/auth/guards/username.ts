import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthExtractService, AuthUserService } from '../services';

/**
 * Extract username from the request body
 * And append user to the request
 *
 */
@Injectable()
export class UsernameGuard implements CanActivate {
  constructor(
    private readonly authService: AuthUserService,
    private readonly extractService: AuthExtractService
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const username = this.extractService.extractUsernameFromBodyOrThrow(ctx);

    const found = await this.authService.findUserByUserNameOrThrow(username);
    this.extractService.appendUserToRequest(ctx, found);

    return true;
  }
}
