import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { TransformAndValidatePipe } from '@webpackages/core';
import { LoginDto, SignupDto, SetPublic, AUTH_BEARER_NAME } from './auth';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @SetPublic()
  @Post('login')
  async login(
    @Body(TransformAndValidatePipe) loginDto: LoginDto,
    @Res() res: Response
  ) {
    const token = await this.authService.login(loginDto);

    res.status(HttpStatus.OK);
    res.setHeader(AUTH_BEARER_NAME, token);
    res.end();
    return;
  }

  @SetPublic()
  @Post('signup')
  async signup(
    @Body(TransformAndValidatePipe) signupDto: SignupDto,
    @Res() res: Response
  ) {
    const token = await this.authService.signup(signupDto);
    res.status(HttpStatus.OK);
    res.setHeader(AUTH_BEARER_NAME, token);
    res.end();
  }
}
