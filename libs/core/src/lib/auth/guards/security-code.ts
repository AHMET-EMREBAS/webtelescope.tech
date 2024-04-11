import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services';

/**
 * Extract security code from the request query object
 * Then, find the user by security code
 * If found, create user session, and append authorization token to
 */
@Injectable()
export class SecurityCodeGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    await this.authService.verifySecurityCodeAndCreateSessionOrThrow(ctx);
    return true;
  }
}
