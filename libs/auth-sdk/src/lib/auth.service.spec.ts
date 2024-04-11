import { Test } from '@nestjs/testing';

import { AuthClientService } from './auth.service';

import { AxiosError } from 'axios';
import { HttpExceptionBody } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrrorResponse } from '@webpackages/model';
import { AuthClientModule } from './auth-client.module';

describe('AuthService', () => {
  let authService: AuthClientService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        AuthClientModule.configure({
          appname: 'auth',
          oauthApiKey: '',
          orgname: 'main',
        }),
      ],
    }).compile();

    authService = app.get(AuthClientService);
  });

  it('should initialize', () => {
    expect(authService).toBeTruthy();
  });

  it('should login with default root username and password', async () => {
    const res = await authService.login({
      username: 'root@webtelescope.tech',
      password: '!Password123.',
    });

    expect(res.status).toBe(201);
    expect(res).toBeTruthy();
    expect(res.data.accessToken).toBeTruthy();
    expect(res.data.deviceId).toBeTruthy();
  });

  it('should not logout', async () => {
    try {
      await authService.logout();
      fail();
    } catch (err) {
      const { response } = err as AxiosError<HttpExceptionBody>;
      const { error, message, statusCode } = response!.data;

      expect(error).toBe('Unauthorized');
      expect(statusCode).toBe(401);
      expect(message).toBe('You do not have a session!');
    }
  });

  it('should not logout all devices', async () => {
    try {
      await authService.logoutAllDevices();
      fail();
    } catch (err) {
      const { response } = err as AxiosError<HttpExceptionBody>;
      const { error, message, statusCode } = response!.data;

      expect(error).toBe('Unauthorized');
      expect(statusCode).toBe(401);
      expect(message).toBe('You do not have a session!');
    }
  });

  it('should check user has session or not', async () => {
    try {
      await authService.hasSession();
      fail();
    } catch (err) {
      const { response } = err as AxiosError<HttpExceptionBody>;
      const { error, message, statusCode } = response!.data;

      expect(error).toBe('Unauthorized');
      expect(statusCode).toBe(401);
      expect(message).toBe('You do not have a session!');
    }
  });

  it('should not signup for the root username and password', async () => {
    try {
      await authService.signup({
        orgname: 'main',
        username: 'root@webtelescope.tech',
        password: '!Password123.',
      });
      fail();
    } catch (err) {
      const { response } = err as AxiosError<ErrrorResponse<ValidationError[]>>;
      const { error, message, statusCode } = response!.data;

      expect(message).toBeTruthy();
      expect(message[0].constraints).toBeTruthy();
      expect(message[0].constraints).toHaveProperty;

      expect(message[0].constraints).toHaveProperty('isNotIn');
      expect(statusCode).toBe(422);
      expect(error).toBe('Unprocessable Entity');
    }
  });
});
