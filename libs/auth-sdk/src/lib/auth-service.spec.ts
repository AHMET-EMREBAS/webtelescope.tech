import { Test } from '@nestjs/testing';
import { HttpClientModule } from '@webpackages/core';
import { AuthClientService } from './auth-service';

describe('AuthService', () => {
  let authService: AuthClientService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        HttpClientModule.configure({
          baseURL: 'http://localhost:3001',
          orgname: 'main',
        }),
      ],
      providers: [AuthClientService],
    }).compile();

    authService = app.get(AuthClientService);
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

  it('should not login with wrong credentials', async () => {
    const res = await authService.logout();

    expect(res.status).toBe(200);
    expect(res.data.message).toBe(200);
  });
});
