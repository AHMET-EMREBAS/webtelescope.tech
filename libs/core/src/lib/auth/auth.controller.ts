import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformAndValidatePipe } from '../pipes';
import { LoginDto, SignupDto } from './dtos';
import { Response } from 'express';
import { AUTH_BEARER_NAME, SetPublic } from './auth';
import { AuthService } from './auth.service';

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
