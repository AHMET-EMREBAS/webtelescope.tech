import { AppModule } from './app/app.module';
import { bootstrap } from '@webpackages/rest';

bootstrap({
  authtokenName: 'authtoken',
  module: AppModule,
  https: false,
  title: 'Api',
  version: '1.0.0',
});
