import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';

/**
 * Check user credentials and create a new session
 */
@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const { username, password } =
      this.authService.extractUsernameAndPassworFromBodyThrow(ctx);

    const user = await this.authService.findUserByUserNameOrThrow(username);

    this.authService.comparePasswordOrThrow(password, user.password);

    const session = await this.authService.createNewSession(user);

    const token = this.authService.signToken(session);

    this.authService.appendAuthorizationToken(ctx, token);

    return true;
  }
}
