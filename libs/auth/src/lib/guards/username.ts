import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';

/**
 * Extract username from the request body
 * And append user to the request
 * 
 */
@Injectable()
export class UsernameGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    const username = this.authService.extractUsernameFromBodyOrThrow(ctx);

    const found = await this.authService.findUserByUserNameOrThrow(username);
    this.authService.appendUserToRequest(ctx, found);

    return true;
  }
}
