import { bootAuthModule } from '@webpackages/auth';

bootAuthModule({
  appDescription: 'Auth Service',
  appName: 'AuthService',
  email: 'auth@webtelescope.tech',
  host: 'auth.webtelescope.tech',
  port: 3001,
  website: 'https://webtelescope.tech',
});
