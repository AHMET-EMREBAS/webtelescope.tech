import { AppModule } from './app/app.module';
import { bootstrap } from '@webpackages/core';

bootstrap({
  appModule: AppModule,
  appDescription: 'Business Management Suite',
  appName: 'Web Telescopoe',
  email: 'info@webtelescope.tech',
  host: 'localhost',
  port: 3000,
  website: 'www.url.com',
});
