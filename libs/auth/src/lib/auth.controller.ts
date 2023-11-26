import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './meta';
import { ValidationPipe } from '@webpackages/rest';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  ResetPasswordWithCodeDto,
} from './dtos';
import { UserService } from './user';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthEvents } from './auth.event';
import { SecurityCodeService } from './security-code.service';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly securityCodeService: SecurityCodeService
  ) {}

  @Public()
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response) {
    const foundUser = await this.userService.findOneBy(
      'username',
      loginDto.username
    );

    if (foundUser) {
      if (compareSync(loginDto.password, foundUser.password!)) {
        const token = this.jwt.sign({
          sub: foundUser.id,
          roles: foundUser.roles,
        });

        res.cookie(AUTH_TOKEN_NAME, token);
        res.send({ [AUTH_TOKEN_NAME]: token });
        return;
      }
      throw new UnauthorizedException(`Password is wrong!`);
    }
    throw new UnauthorizedException(`User not found!`);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body(ValidationPipe) dto: ForgotPasswordDto) {
    const { username } = dto;
    const found = await this.userService.findOneBy('username', username);

    if (found) {
      const code = this.securityCodeService.set(username);
      this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD, { username, code });

      return { message: 'Check your inbox' };
    }

    throw new NotFoundException(`User not found!`);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto
  ) {
    const found = await this.userService.findOneBy(
      'username',
      resetPasswordDto.username
    );

    if (found) {
      if (compareSync(resetPasswordDto.currentPassword, found.password!)) {
        await this.userService.update(found.id!, {
          password: resetPasswordDto.password,
        });
        return { message: 'Updated password' };
      }
      throw new UnauthorizedException(`Password is wrong`);
    }

    throw new NotFoundException('User not found!');
  }

  @Public()
  @Post('reset-password-with-code')
  async resetPasswordWithCode(
    @Body(ValidationPipe) dto: ResetPasswordWithCodeDto
  ) {
    const found = await this.userService.findOneBy('username', dto.username);

    if (found) {
      const isCodeValid = this.securityCodeService.verify(
        dto.username,
        dto.securityCode
      );

      if (isCodeValid) {
        await this.userService.update(found.id!, { password: dto.password });
        return { message: 'Updated password' };
      }

      throw new UnauthorizedException(`Security code is not valid!`);
    }

    throw new NotFoundException('User not found!');
  }
}
