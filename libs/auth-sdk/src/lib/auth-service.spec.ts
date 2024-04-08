import { Test } from '@nestjs/testing';
import { HttpClientModule } from '@webpackages/core';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let authService: AuthService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpClientModule.configure('http://localhost:3001', '')],
      providers: [AuthService],
    }).compile();

    authService = app.get(AuthService);
  });

  it('should login', async () => {
    const result = await authService.login({
      username: 'root@webtelescope.tech',
      password: '!Password123.',
    });

    expect(result.accessToken).toBeTruthy();
    expect(result.deviceId).toBeTruthy();
  });
});
