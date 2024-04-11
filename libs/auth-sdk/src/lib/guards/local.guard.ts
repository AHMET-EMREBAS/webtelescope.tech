import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthClientService } from '../auth-service';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly authService: AuthClientService) {}
  canActivate(context: ExecutionContext) {
    return true;
  }
}
