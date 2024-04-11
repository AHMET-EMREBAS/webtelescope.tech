import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext) {
    await this.authService.hasValidaSessionOrThrow(ctx);
    return true;
  }
}
