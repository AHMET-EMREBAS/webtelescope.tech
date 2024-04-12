import { bootNestApplication } from '@webpackages/boot';
import { AUTH_MODULE_NAME, AppModule } from '@webpackages/auth';

bootNestApplication(AppModule, AUTH_MODULE_NAME);
