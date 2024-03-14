import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthEnum } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.service.login(loginDto);
    return { accessToken };
  }

  @Post()
  logout(@Res() res: Response) {
    res.clearCookie(AuthEnum.AUTH_TOKEN);
    res.end();
  }
}
