import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, SUBSCRIBER_ROLE_NAME } from './meta';
import { ValidationPipe } from '@webpackages/core';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  ResetPasswordWithCodeDto,
  TokenPayload,
} from './dtos';
import { User, UserService } from './user';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthEvents } from './auth.event';
import { SecurityCodeService } from './security-code.service';
import { SignupDto } from './dtos/signup.dto';
import { RoleService } from './role';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwt: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly securityCodeService: SecurityCodeService
  ) {}

  private findByUsername(username: string) {
    return this.userService.findOneBy('username', username);
  }

  private async findByUsernameOrThrow(username: string) {
    const found = await this.findByUsername(username);
    if (found) return found;
    throw new UnauthorizedException('User not found!');
  }

  private comparePasswordAndSignToken(
    password: string,
    hashedPassword: string,
    userData: User
  ) {
    if (compareSync(password, hashedPassword))
      return this.jwt.sign(new TokenPayload(userData).toPlain());
    throw new UnauthorizedException('Wrong password!');
  }

  @Public()
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response) {
    const { username, password } = loginDto;
    const foundUser = await this.findByUsernameOrThrow(username);
    const { password: hashed } = foundUser;

    const token = this.comparePasswordAndSignToken(password, hashed, foundUser);

    res.cookie(AUTH_TOKEN_NAME, token);
    res.header('authorization', `Bearer ${token}`);
    res.send({ message: 'Welcome' });
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body(ValidationPipe) dto: ForgotPasswordDto) {
    const { username } = dto;
    const found = await this.userService.findOneBy('username', username);

    if (found) {
      const code = this.securityCodeService.set(username);
      this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD_REQUEST, {
        username,
        code,
      });

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
        this.eventEmitter.emit(AuthEvents.UPDATED_PASSWORD);
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
        this.eventEmitter.emit(AuthEvents.UPDATED_PASSWORD, {
          username: found.username,
        });
        return { message: 'Updated password' };
      }
      throw new UnauthorizedException(`Security code is not valid!`);
    }

    throw new NotFoundException('User not found!');
  }

  @Public()
  @Post('signup')
  async signup(@Body(ValidationPipe) signupDto: SignupDto) {
    const found = await this.userService.findOneBy(
      'username',
      signupDto.username
    );

    if (found) {
      throw new UnprocessableEntityException(`Username is alerady in use!`);
    }

    const { username, password } = signupDto;

    const subRole = await this.roleService.findOneBy(
      'name',
      SUBSCRIBER_ROLE_NAME
    );

    const savedUser = await this.userService.save({
      username,
      password,
      roles: [],
    });

    if (subRole && savedUser) {
      await this.userService.add(savedUser.id, 'roles', subRole.id!);
      this.eventEmitter.emit(AuthEvents.SIGNUP, {
        username: savedUser.username,
      });
    }
  }
}
