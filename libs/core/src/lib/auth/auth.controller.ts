import { Post } from '@nestjs/common';
import { Controller } from '../decorators';

@Controller({ tags: ['AuthController'], route: 'auth' })
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  login() {}

  @Post('logout')
  logout() {}

  @Post('signup')
  signup() {}

  @Post('forgot-password')
  forgotPassword() {}

  @Post('login-with-code')
  loginWithCode() {}
}
