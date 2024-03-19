import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';

@Injectable()
export class SecurityCodeGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    const securityCode =
      this.authService.extractSecurityCodeFromQueryOrThrow(ctx);

    console.log(securityCode);
    const user = await this.authService.findUserBySecurityCodeOrThrow(
      securityCode
    );

    console.log(user);

    const session = await this.authService.createSession(user);

    const token = this.authService.signToken(session);

    this.authService.appendAuthorizationToken(ctx, token);

    return true;
  }
}
