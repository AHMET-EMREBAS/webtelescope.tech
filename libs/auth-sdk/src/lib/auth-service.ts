import { Injectable } from '@nestjs/common';
import {
  IForgotPasswordDto,
  ILoginDto,
  IUpdatePasswordDto,
} from '@webpackages/model';
import { HttpClientService } from '@webpackages/core';
import { LoginWithCodeDto } from '@webpackages/dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClientService) {}

  async login(loginDto: ILoginDto) {
    return await this.httpClient.post('api/auth/login', loginDto);
  }

  async logout() {
    return await this.httpClient.get('api/auth/logout');
  }

  async logoutAllDevices() {
    return await this.httpClient.get('api/auth/logout-all-devices');
  }

  async hasSession() {
    return await this.httpClient.get('api/auth/has-session');
  }

  async updatePassword(body: IUpdatePasswordDto) {
    return await this.httpClient.post('api/auth/update-password', body);
  }

  async forgotPassword(body: IForgotPasswordDto) {
    return await this.httpClient.post('api/auth/forgot-password', body);
  }

  async loginWithCode(body: LoginWithCodeDto) {
    return await this.httpClient.get(
      `api/auth/login-with-code/?securityCode=${body.securityCode}&username=${body.username}`
    );
  }
}
