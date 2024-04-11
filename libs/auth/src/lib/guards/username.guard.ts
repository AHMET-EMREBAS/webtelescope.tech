import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Extract username from the request body
 * And append user to the request
 *
 */
@Injectable()
export class UsernameGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    this.authService.verifyUsernameOrThrow(ctx);
    return true;
  }
}
