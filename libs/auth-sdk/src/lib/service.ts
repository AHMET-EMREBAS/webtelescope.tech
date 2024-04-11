import { Injectable } from '@nestjs/common';
import { ILoginDto, MessageResponse } from '@webpackages/model';
import {
  CreateSubDto,
  ForgotPasswordDto,
  LoginResponse,
  LoginWithCodeDto,
  UpdatePasswordDto,
} from '@webpackages/dto';
import { AuthHttpClientService } from './http-client';

@Injectable()
export class AuthClientService {
  constructor(private readonly httpClient: AuthHttpClientService) {}

  async login(loginDto: ILoginDto) {
    return await this.httpClient.post<LoginResponse>(
      'api/auth/login',
      loginDto
    );
  }

  async logout() {
    return await this.httpClient.get<MessageResponse>('api/auth/logout');
  }

  async logoutAllDevices() {
    return await this.httpClient.get<MessageResponse>(
      'api/auth/logout-all-devices'
    );
  }

  async hasSession() {
    return await this.httpClient.get('api/auth/has-session');
  }

  /**
   * Update password
   * @param body
   * @returns message {@link MessageResponse}
   */
  async updatePassword(body: UpdatePasswordDto) {
    return await this.httpClient.post<MessageResponse>(
      'api/auth/update-password',
      body
    );
  }

  /**
   * Send password-reset-link via email
   * @param body
   * @returns message {@link MessageResponse}
   */
  async forgotPassword(body: ForgotPasswordDto) {
    return await this.httpClient.post('api/auth/forgot-password', body);
  }

  /**
   * Login with security code
   * @param body
   * @returns LoginResponse {@link LoginResponse}
   */
  async loginWithCode(body: LoginWithCodeDto) {
    return await this.httpClient.get(
      `api/auth/login-with-code/?securityCode=${body.securityCode}&username=${body.username}`
    );
  }

  /**
   * Signup
   * @param body
   * @returns
   */
  async signup(body: CreateSubDto) {
    return await this.httpClient.post<LoginResponse>('api/auth/signup', body);
  }
}
