import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';
import {
  IProfileConfigService,
  InjectUserService,
  InjectProfileConfigService,
  MaintananceInterceptor,
  Post,
  Profile,
  SlowInterceptor,
  TestUserService,
  WithBearer,
} from '@webpackages/core';
import { IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ enum: [Profile.SLOW, Profile.MAINTANANCE] })
  @IsNotEmpty()
  profile: string;
}

export class LocaleDto {
  @ApiProperty({ enum: ['TR', 'EN', 'ES'] })
  @IsNotEmpty()
  locale: string;
}

@Controller()
export class AppController {
  constructor(
    @InjectProfileConfigService()
    private readonly configService: IProfileConfigService,
    private readonly appService: AppService,
    @InjectUserService() private readonly userService: TestUserService
  ) {}

  @WithBearer()
  @Get('secure')
  secure() {
    return 'secured';
  }

  @Get('hello')
  getData() {
    return { message: this.configService.getMessage('HELLO') };
  }

  @UseInterceptors(MaintananceInterceptor)
  @Get('users')
  getUSers() {
    return this.userService.users;
  }

  @UseInterceptors(SlowInterceptor)
  @Get('slow-users')
  slowUsers() {
    return this.userService.users;
  }

  @Post({ path: 'set-profile' })
  setProfile(@Query() profileDto: ProfileDto) {
    const { profile } = profileDto;
    this.configService.set(Profile.PROFILE, profile);
    return { profile };
  }

  @Post({ path: 'set-locale' })
  setLocale(@Query() profileDto: LocaleDto) {
    const { locale } = profileDto;
    this.configService.set(Profile.LOCALE, locale);
    return { locale };
  }
}
