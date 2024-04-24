/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Res } from '@nestjs/common';
import { Controller, Post } from '../rest';
import { AuthNames, AuthToken } from './common';
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
  login(@AuthToken() autorization: string, @Body() loginDto: LoginDto) {
    return { [AuthNames.BEARER_HEADER_KEY]: autorization };
  }
}
