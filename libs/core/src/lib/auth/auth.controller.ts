import { Res } from '@nestjs/common';
import { Controller, Post } from '../rest';
import { AccessToken, AuthNames } from './common';
import { Response } from 'express';
import { IAuthUserService, InjectAuthUserService } from './services';

@Controller({
  path: 'auth',
  tags: [AuthController.name],
})
export class AuthController {
  constructor(
    @InjectAuthUserService()
    protected readonly userService: IAuthUserService
  ) {}

  @Post({
    path: 'login',
    security: {
      credentials: true,
    },
  })
  login(@AccessToken() accessToken: string, @Res() res: Response) {
    res.cookie(AuthNames.ACCESS_TOKEN_COOKIE_KEY, accessToken);
    res.send({
      accessToken,
    });
  }
}
