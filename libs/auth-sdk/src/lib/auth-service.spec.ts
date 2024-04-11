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

  it('should login', async () => {
    const res = await authService.login({
      username: 'root@webtelescope.tech',
      password: '!Password123.',
    });
    expect(res.status).toBe(201);

    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.deviceId).toBeTruthy();
  });
});
