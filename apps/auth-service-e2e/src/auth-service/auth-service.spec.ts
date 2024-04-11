import { AuthClientService } from '@webpackages/auth-sdk';
import { HttpClientService } from '@webpackages/core';
describe('Post /api/auth/login', () => {
  let authService: AuthClientService;

  beforeAll(() => {
    const httpClient = new HttpClientService({
      baseURL: 'http://localhost:3001',
    });

    authService = new AuthClientService(httpClient);
  });
  it('Root user should login with credentials', async () => {
    const res = await authService.login({
      username: 'root@webtelescope.tech',
      password: '!Password123.',
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.message).toBeTruthy();
  });
});
