import { Body, Res } from '@nestjs/common';
import { Controller, Post } from '../rest';
import { AccessToken, AuthNames } from './common';
import { Response } from 'express';
import { WithCredential } from './guards';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string', example: 'root1@gmail.com' })
  @IsNotEmpty()
  username!: string;
  @ApiProperty({ type: 'string', example: 'password1' })
  @IsNotEmpty()
  password!: string;
}

@Controller({
  path: 'auth',
  tags: [AuthController.name],
})
export class AuthController {
  @WithCredential()
  @Post({ path: 'login' })
  login(
    @AccessToken() accessToken: string,
    @Res() res: Response,
    @Body() loginDto: LoginDto
  ) {
    res.cookie(AuthNames.ACCESS_TOKEN_COOKIE_KEY, accessToken);
    res.send({
      accessToken,
    });
  }
}
