import { AppModule } from './app/app.module';
import { bootstrap } from '@webpackages/rest';

bootstrap({
  module: AppModule,
  title: 'Api',
  version: '1.0.0',
});
