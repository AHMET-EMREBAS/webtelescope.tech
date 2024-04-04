import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';

/**
 * Extract security code from the request query object
 * Then, find the user by security code
 * If found, create user session, and append authorization token to
 */
@Injectable()
export class SecurityCodeGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    const securityCode =
      this.authService.extractSecurityCodeFromQueryOrThrow(ctx);

    const user = await this.authService.findUserBySecurityCodeOrThrow(
      securityCode
    );

    const session = await this.authService.createSession(user);

    const token = this.authService.signToken(session);

    this.authService.appendAuthorizationToken(ctx, token);

    return true;
  }
}
