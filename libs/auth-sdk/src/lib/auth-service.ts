import { Injectable } from '@nestjs/common';
import {
  IForgotPasswordDto,
  ILoginDto,
  IUpdatePasswordDto,
} from '@webpackages/model';
import { HttpClientService } from '@webpackages/core';
import { LoginResult, LoginWithCodeDto } from '@webpackages/dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthClientService {
  constructor(private readonly httpClient: HttpClientService) {}

  private toResponse(res: AxiosResponse) {
    return {
      status: res.status,
      message: res.statusText,
      body: res.data,
    };
  }
  async login(loginDto: ILoginDto) {
    return await this.httpClient.post<LoginResult>('api/auth/login', loginDto);
  }

  async logout() {
    return this.httpClient.get('api/auth/logout').then;
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
